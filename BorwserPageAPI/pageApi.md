# (一): ==Page Visibility API==

##  1. document.visibilityState:
 **==监听网页诞生到卸载的整个过程==。返回支持一个字符串，判断页面状态是否处于可视状态，及当前用户操作tab下。如果当前页面中有==iframe== 他不会在意==iframe== 是否可见 ==document.visibilityState只针对于top窗口，并且CSS属性直接视为无效==**

 1. hidden：页面彻底不可见 [^1]。
 1. visible：页面至少一部分可见 [^2]。
 1. prerender：页面即将或正在渲染，处于不可见状态。[^3] **( 部分浏览器不支持 )**

[^1]: ### ==hidden:==
    > 1. 浏览器最小化。
    > 1. 浏览器没有最小化，但是当前页面切换成了背景页。
    > 1. 浏览器将要卸载（unload）页面。
    > 1. 操作系统触发锁屏屏幕。

[^2]: ### ==visible:==
    > 1. 只要页面可见，哪怕只露出一个角。
    > 1. 当前页面在操作范围内

[^3]: ### ==prerender:==
    > 1. 状态只在支持"预渲染"的浏览器上才会出现

## 2. document.hidden：
 **返回一个布尔类型的只读属性，页面可见时。及==document.visibilityState返回 “visible”==时 返回 ==false== 其他均返回 ==true==**

## 3. visibilitychange事件：
```javascript {.line-numbers}
window.addEventListener('visibilitychange', () => {
    const pageStatus = {
        visible: "我当前是可见的",
        hidden: "我当前是不见的",
    };
    console.log(pageStatus[document.visibilityState]);
})
```

## 4. pageunload:
 **当前页面卸载的时候都会触发 ==visibilitychange事件== 及可以使用==visibilitychange事件==监听并完成所需操作，下面是一些常见的页面卸载动作。**
> 1. 页面可见时，用户关闭 Tab 页或浏览器窗口。
> 1. 页面可见时，用户在当前窗口前往另一个页面。
> 1. 页面不可见时，用户或系统关闭浏览器窗口。


# (二): Page Lifecycle API [原文链接](http://www.ruanyifeng.com/blog/2018/11/page_lifecycle_api.html)
 **专门为解决在非正常关闭网页的情况下而诞生的，表现在==移动端、pc端随时的杀掉进程==,由于此API过新，新版浏览器逐渐开始支持，为兼容旧版及可以使用谷歌开发的兼容库[PageLifecycle.js](https://github.com/GoogleChromeLabs/page-lifecycle)**

### 1. 生命周期
  ##### 1. Active 阶段
  > 在 Active 阶段，网页处于可见状态，且拥有输入焦点。
  ##### 2. Passive 阶段
  > 在 Passive 阶段，网页可见，但没有输入焦点，无法接受输入。UI 更新（比如动画）仍然在执行。该阶段只可能发生在桌面同时有多个窗口的情况。
  ##### 3. Hidden 阶段
  > 在 Hidden 阶段，用户的桌面被其他窗口占据，网页不可见，但尚未冻结。UI 更新不再执行。
  ##### 4. Terminated 阶段
  > 在 Terminated 阶段，由于用户主动关闭窗口，或者在同一个窗口前往其他页面，导致当前页面开始被浏览器卸载并从内存中清除。注意，这个阶段总是在 Hidden 阶段之后发生，也就是说，用户主动离开当前页面，总是先进入 Hidden 阶段，再进入 Terminated 阶段。
  这个阶段会导致网页卸载，任何新任务都不会在这个阶段启动，并且如果运行时间太长，正在进行的任务可能会被终止。
  ##### 5. Frozen 阶段
  > 如果网页处于 Hidden 阶段的时间过久，用户又不关闭网页，浏览器就有可能冻结网页，使其进入 Frozen 阶段。不过，也有可能，处于可见状态的页面长时间没有操作，也会进入 Frozen 阶段。
  >这个阶段的特征是，网页不会再被分配 CPU 计算资源。定时器、回调函数、网络请求、DOM 操作都不会执行，不过正在运行的任务会执行完。浏览器可能会允许 Frozen 阶段的页面，周期性复苏一小段时间，短暂变回 Hidden 状态，允许一小部分任务执行。
  ##### 6.Discarded 阶段
  > 如果网页长时间处于 Frozen 阶段，用户又不唤醒页面，那么就会进入 Discarded 阶段，即浏览器自动卸载网页，清除该网页的内存占用。不过，Passive 阶段的网页如果长时间没有互动，也可能直接进入 Discarded 阶段。
  >这一般是在用户没有介入的情况下，由系统强制执行。任何类型的新任务或 JavaScript 代码，都不能在此阶段执行，因为这时通常处在资源限制的状况下。
  >网页被浏览器自动 Discarded 以后，它的 Tab 窗口还是在的。如果用户重新访问这个 Tab 页，浏览器将会重新向服务器发出请求，再一次重新加载网页，回到 Active 阶段。

### 2. 常见场景
>1. 用户打开网页后，又切换到其他 App，但只过了一会又回到网页。网页由 Active 变成 Hidden，又变回 Active。
>1. 用户打开网页后，又切换到其他 App，并且长时候使用后者，导致系统自动丢弃网页。网页由 Active 变成 Hidden，再变成 Frozen，最后 Discarded。
>1. 用户打开网页后，又切换到其他 App，然后从任务管理器里面将浏览器进程清除。网页由 Active 变成 Hidden，然后 Terminated。
>1. 系统丢弃了某个 Tab 里面的页面后，用户重新打开这个 Tab。网页由 Discarded 变成 Active。

### 3. 事件
1. focus 事件
    > 在页面获得输入焦点时触发，比如网页从 Passive 阶段变为 Active 阶段。
1. blur 事件
    > 在页面失去输入焦点时触发，比如网页从 Active 阶段变为 Passive 阶段。
1. visibilitychange 事件
    > 在网页可见状态发生变化时触发，一般发生在以下几种场景。
    >* 用户隐藏页面（切换 Tab、最小化浏览器），页面由 Active 阶段变成 Hidden 阶段。
    >* 用户重新访问隐藏的页面，页面由 Hidden 阶段变成 Active 阶段。
    >* 用户关闭页面，页面会先进入 Hidden 阶段，然后进入 Terminated 阶段。 
    
    **可以通过document.onvisibilitychange属性指定这个事件的回调函数。**
1. freeze 事件
    > 在网页进入 Frozen 阶段时触发。

    **可以通过document.onfreeze属性指定在进入 Frozen 阶段时调用的回调函数。**
    ```javascript {.line-numbers}
        window.addEventListener('freeze',()=>{
            console.log('这里触发事件')
        })
    ```
    **注意：==这个事件的监听函数，最长只能运行500毫秒。并且只能复用已经打开的网络连接，不能发起新的网络请求。从 Frozen 阶段进入 Discarded 阶段，不会触发任何事件，无法指定回调函数，只能在进入 Frozen 阶段时指定回调函数。==**
1. resume 事件
    >在网页离开 Frozen 阶段，变为 Active / Passive / Hidden 阶段时触发。
    >document.onresume属性指的是页面离开 Frozen 阶段、进入可用状态时调用的回调函数。
     ```javascript {.line-numbers}
        window.addEventListener('resume',()=>{
            console.log('这里触发事件')
        })
    ```
1. pageshow 
    >在用户加载网页时触发。这时，有可能是全新的页面加载，也可能是从缓存中获取的页面。如果是从缓存中获取，则该事件对象的event.persisted属性为true，否则为false。==跟浏览器的 History 记录的变化有关。==
1. pagehide 事件
    >在用户离开当前网页、进入另一个网页时触发。它的前提是浏览器的 History 记录必须发生变化，跟网页是否可见无关。
    >如果浏览器能够将当前页面添加到缓存以供稍后重用，则事件对象的event.persisted属性为true。 如果为true。如果页面添加到了缓存，则页面进入 Frozen 状态，否则进入 Terminatied 状态。
1. beforeunload 事件
    >在窗口或文档即将卸载时触发。该事件发生时，文档仍然可见，此时卸载仍可取消。经过这个事件，网页进入 Terminated 状态。
1. unload 事件
    >在页面正在卸载时触发。经过这个事件，网页进入 Terminated 状态。

### 4. 获取当前阶段
  **如果网页处于 Active、Passive 或 Hidden 阶段，可以通过下面的代码，获得网页当前的状态**
  **如果网页处于 Frozen 和 Terminated 状态，由于定时器代码不会执行，只能通过事件监听判断状态。进入 Frozen 阶段，可以监听freeze事件；进入 Terminated 阶段，可以监听pagehide事件。**

```javascript {.line-numbers}
    const getState = () => {
    if (document.visibilityState === 'hidden') {
        return 'hidden';
    }
    if (document.hasFocus()) {
        return 'active';
    }
    return 'passive';
};
```   
### 5. document.wasDiscarded
**如果某个选项卡处于 Frozen 阶段，就随时有可能被系统丢弃，进入 Discarded 阶段。如果后来用户再次点击该选项卡，浏览器会重新加载该页面。** 
**这时，开发者可以通过判断document.wasDiscarded属性，了解先前的网页是否被丢弃了。**

```javascript {.line-numbers}
    if (document.wasDiscarded) {
    // 该网页已经不是原来的状态了，曾经被浏览器丢弃过
    // 恢复以前的状态
    getPersistedState(self.discardedClientId);
    }
``` 
**注意：==同时，window对象上会新增window.clientId和window.discardedClientId两个属性，用来恢复丢弃前的状态。==**