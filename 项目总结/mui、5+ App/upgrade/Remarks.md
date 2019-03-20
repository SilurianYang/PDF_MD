### App升级模板使用说明

##### 当前版本：1.0.0

### 简介说明:

> 开箱即用。简单部署，下载运行即可看到效果，**完全不需要后台！！！**  在每个栏目下都有一个 **update.json** 文件，此文件作为升级功能的重要文件，需要把这个文件放在服务器下，通过请求此文件完成校验并升级。

#### 使用说明：
1. 卸载app上已经存在的hbuilder或hbuilderx同步的app，方便测试。
1. 下载你压缩包，找到你想测试的项目，点击去找到**update.json** 文件，扔到服务器。
1. 找到对应项目下的base.js，修改路径为你自己的**update.json**文件路径。
1. 查看对应项目下的**manifest.json** 节点**版本号**，修改**update.json**下**version**节点。列如：manifest.json下为1.0.0，update.json修改version为1.0.1 则升级，节点属性相同则不升级App直接跳过升级操作。

#### update.json
|    节点名称    |   参数类型    |   必填    |   描述  | 
|   ----    |   ----    |   ----    |   ----    | 
|    version |   string  |   是  |   用于对比manifest.json中的版本号    |
|   download    |   string  |   是  |  必填 热更下载地址 string格式只能唯一    |  
|   new_download    |    Array  |   否  |   非必填 Array格式 循环下载，挨着尝试（直到成功结束），尝试完成。当前此项存在的时候忽略download 属性  |
|   size    |   number  |   是  |   当前安装包文件大小(b)，用于对比当前下载的包是否完整    |
|   android-->min_hotupdate_ver |   string  |   是  |   最小支持的热更版本，如果此选项和version选项相同值的情况下，会采取浏览器打开的方式下载。整包更新。   |
|   android-->install |   string  | 是    |    整包下载地址 string格式只能唯一    |
|   android-->new_install |      Array    |   否  |    Array格式 随机选择一个下载地址打开浏览器下载。当前此项存在的时候忽略install 属性 |
|   iphone-->min_hotupdate_ver  |   string  |   是  |   最小支持的热更版本，如果此选项和version选项相同值的情况下，会采取浏览器打开的方式下载。整包更新。   |
|   iphone-->install    |   string  |   是  |    整包下载地址 string格式只能唯一    |
|   iphone-->new_install    |   Array   |   否  |   Array格式 随机选择一个下载地址打开浏览器下载。当前此项存在的时候忽略install 属性    |

