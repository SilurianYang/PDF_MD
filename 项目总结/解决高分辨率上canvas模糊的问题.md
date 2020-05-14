## 原因总结
> 在移动端盛行，高清屏基本上已经普及的现在，1px的css像素实际上代表了4个甚至更多的物理像素。但是由于我们的代码问题，我们1px的css像素和1个canvas像素画上了等号，也就导致了1个canvas像素实际需要填充4个甚至更多物理像素，为了保证图像平滑处理，在填充剩余的物理像素时采用了原先颜色的近似值，导致了图像的模糊。说的再简单点就是：**不同屏幕的设备像素比不一致，需要统一纠正。**


## 解决问题

1. 首先获取 Canvas 对象：
```js
const myCanvas = document.getElementById("myCanvas");
const context = myCanvas.getContext("2d");
```

2. 获取像素比，将 Canvas 宽高进行放大，放大比例为：**devicePixelRatio / webkitBackingStorePixelRatio** 

```js
const getPixelRatio = function (context) {
    const backingStore = context.backingStorePixelRatio ||
        context.webkitBackingStorePixelRatio ||
        context.mozBackingStorePixelRatio ||
        context.msBackingStorePixelRatio ||
        context.oBackingStorePixelRatio ||
        context.backingStorePixelRatio || 1;
    return (window.devicePixelRatio || 1) / backingStore;
};
```
3. 按实际渲染倍率来缩放canvas

```js
const ratio = getPixelRatio(context);

myCanvas.style.width = myCanvas.width + 'px';
myCanvas.style.height = myCanvas.height + 'px';
 
myCanvas.width = myCanvas.width * ratio;
myCanvas.height = myCanvas.height * ratio;
```

4. 关于绘制

```js
context.font = `normal normal 100 ${15*ratio}px 微软雅黑`;
context.textAlign = 'center'
const arcW = 12*ratio;
context.arc(x*ratio, y*ratio, arcW, 0, Math.PI * 2, true);

//....
```
**根据实际大小乘比例即可达到高清效果！**