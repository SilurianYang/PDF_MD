let vue = null
let init = () => {
	vue = new Vue({
		el: '#root',
		data: {
			upgrade: 0,
			text: '正在更新资源，请稍等...',
			current_version: 100,
			downPath: [],
			configData: {},
			AppupdateUrl:window.AppupdateUrl
		},
		created() {
			plus.navigator.setFullscreen(true);
			let current_version = plus.storage.getItem('current_version');

			let AppupdateUrl=plus.storage.getItem('AppupdateUrl');
			if(AppupdateUrl==null){		//本地存储中没有保留用户自定义的url，就是测试保存的
				plus.storage.setItem('AppupdateUrl', this.AppupdateUrl);
			}
			if(current_version == null) {
				this.getWidgetInfo().then((data) => {
					this.current_version = data;
					this.detectUpgrade();
				})
			} else {
				this.current_version = current_version;
				this.detectUpgrade();
			}
		},
		watch: {
			upgrade: function(val) {
				mui('#mui-progressbar').progressbar({
					progress: val
				}).show();
			}
		},
		methods: {
			/**
			 *版本确认
			 */
			versionChecked(currentV) {
				let oldV = this.current_version.split('.');
				let newV = currentV.split('.');
				for(let i = 0; i < oldV.length; i++) {
					let item = (+oldV[i]);
					let item2 = (+newV[i]);
					if(item != item2) {
						if(item > item2) { //旧版大于新版 直接返回false
							return false //不需要升级
						} else {
							return true;
						}
					} else {
						continue
					}
				}
				return false //不需要升级
			},
			/**
			 * 首先获取下载地址,之前的下载地址为字符串系列。
			 *传入一个父对象、一个key  返回随机一个下载地址
			 */
			getConfigDownPath(pobj, key) {
				JSON.stringify(pobj)
				let newDownObj = pobj[`new_${key}`]
				if(typeof newDownObj != "undefined") { //先判断当前json文件中是否包含新版的升级下载地址,如果包含优先使用新版的
					//新版的下载地址必须是一个数组格式
					let pathsLeng = newDownObj.length;
					let randomIndex = parseInt(Math.random() * pathsLeng);
					let path=newDownObj[randomIndex];
					if(key == "download") { //热更key,新版使用
						this.downPath = newDownObj;
						this.downPath.splice(randomIndex,1);
					}
					return path
				}
				//没有新版下载地址，直接读取传过来的key value
				return pobj[key]
			},
			/**
			 * 获取项目路径
			 */
			getContextPath() {
				var path = window.location.href;
				var protocol = document.location.protocol;
				var pathName = document.location.pathname;
				if(protocol === "http:") {
					var index = pathName.substr(1).indexOf("/");
					var result = pathName.substr(0, index + 1);
					if(result === "/components") {
						result = "";
					}
					return `${location.protocol}//${location.host}${result}`;
				} else {
					return newPath = path.substring(0, path.indexOf('www')) + 'www';
				}
			},
			getWidgetInfo() {
				return new Promise((resolve) => {
					plus.runtime.getProperty(plus.runtime.appid, (wgtinfo) => {
						resolve(wgtinfo.version)
					});
				})
			},
			detectUpgrade() {
				let dtask1 = plus.downloader.createDownload(this.AppupdateUrl, {
					retryInterval: 3,
					timeout: 10
				}, (data, status) => {
					plus.downloader.clear();
					if(status === 200) {
						plus.io.resolveLocalFileSystemURL(data.filename, (entry) => {
							entry.file((file) => {
								let fileReader = new plus.io.FileReader();
								fileReader.readAsText(file, 'utf-8');
								fileReader.onload = function() {
									let results = JSON.parse(fileReader.result);
									if(!this.versionChecked(results.version)) {
										console.log('不需要升级')
										mui.openWindow({
											url: `${this.getContextPath()}/login.html`,
											id: 'login',
											extras: {
												updatePage: true,
											},
											waiting: {
												autoShow: false,
												aniShow: 'zoom-out',
												duration: 0
											}
										})
									} else { //需要升级
										plus.navigator.closeSplashscreen();
										let iphoneData = '';
										if(mui.os.android) { //安卓手机
											iphoneData = results['android'];
										} else {
											iphoneData = results['iphone'];
										}
										if(!this.versionChecked(iphoneData.min_hotupdate_ver)) { //热更
											console.log('热更')
											this.configData = JSON.parse(JSON.stringify(results));
											this.Appupdate(this.configData, (data) => {
												this.upgrade = data;
											});
										} else {
											console.log('打开链接下载')
											let downPath = this.getConfigDownPath(iphoneData, "install");
											plus.runtime.openURL(downPath);
										}
									}
								}.bind(this);
								fileReader.onloadend = function() {
									entry.remove(() => {
										console.log('删除成功')
									}, () => {
										console.log('删除失败')
									})
								}
								fileReader.onerror = function() {
									mui.confirm('配置文件打开失败', '提示', ['取消', '确定'], (e) => {
										plus.runtime.quit();
									}, 'div')
								}
							})
						})
					} else {
						mui.confirm('配置文件下载失败', '提示', ['取消', '确定'], (e) => {
							plus.runtime.quit();
						}, 'div')

					}
				});
				dtask1.start();
			},
			/**
			 * 热更升级
			 */
			Appupdate(config, fn) {
				let downPath = this.getConfigDownPath(config, 'download');
				var dtask = plus.downloader.createDownload(downPath, {
					retryInterval: 3,
					timeout: 10
				}, (d, status) => {
					if(status == 200) {
						vue.text = '正在校验安装包是否完整';
						var path = plus.io.convertLocalFileSystemURL(d.filename);
						if(plus.os.name == 'iOS') {
							path = 'file://' + path;
						}
						plus.io.resolveLocalFileSystemURL(path, (entry) => {
							entry.file((fs) => {
								if(fs.size == config.size) {
									this.upgrade = 0;
									let stop = null;
									stop = setInterval(() => {
										vue.text = '正在安装，请稍后';
										if(this.upgrade >= 100) {
											this.upgrade = 100;
											clearInterval(stop);
										} else {
											this.upgrade += 1;
										}
									}, 160)
									plus.runtime.install(path, {
										//					force: true
									}, () => {
										clearInterval(stop);
										this.upgrade = 100;
										vue.text = '安装完成';
										plus.storage.setItem('current_version', config.version);
										entry.remove(() => {
											mui.alert('资源升级完成', '', '确定', (e) => {
												plus.runtime.restart();
											})
										}, () => {
											console.log('安装包删除失败')
										})

									}, (e) => {
										entry.remove(() => {
											console.log('安装包删除成功')
										}, () => {
											console.log('安装包删除失败')
										})
										mui.toast("安装失败了", 'div');
										vue.text = '安装失败了，重启试试？';
										//console.log(JSON.stringify(e))
										clearInterval(stop);
										this.upgrade = 0;
									});
								} else {
									entry.remove(() => {
										console.log('安装包删除成功')
									}, () => {
										console.log('安装包删除失败')
									})
									mui.confirm('下载失败，是否重新安装?', '提示', ['取消', '确定'], (e) => {
										if(e.index === 1) {
											vue.upgrade = 0;
											vue.text = '正在检测更新，请稍后...';
											vue.detectUpgrade();
										} else {
											plus.runtime.quit();
										}
									}, 'div')
								}

							})
						}, () => {
							mui.confirm('读取升级包失败，请重试', '提示', ['取消', '确定'], (e) => {
								plus.runtime.quit();
							}, 'div')
							mui.toast('读取配置文件失败', 'div');
						})

					} else { //下载失败
						if(this.downPath.length != 0) {
							mui.confirm('升级包下载失败，是否重试？', '提示', ['取消', '确定'], (e) => {
								if(e.index == 1) {
									this.Appupdate(this.configData, (data) => {
										this.upgrade = data;
									});
								} else {
									plus.runtime.quit();
								}
							}, 'div')
						} else {
							mui.confirm('升级包下载失败，请退出重试', '提示', ['取消', '确定'], (e) => {
								plus.runtime.quit();
							}, 'div')
						}
					}
				});
				dtask.start();
				dtask.addEventListener("statechanged", (task, status) => {
					switch(task.state) {
						case 1:
							break;
						case 2:
							break;
						case 3:
							let Size = task.downloadedSize / task.totalSize * 100;
							fn.call(this, parseInt(Size));
							break;
						case 4:
							break;
					}
				});
			}
		}
	})
}
if(mui.os.plus) {
	mui.plusReady(() => {
		init();
	})
}