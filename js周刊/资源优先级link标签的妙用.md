#### <link>标签的妙用：
**==预加载:==**
**\<link rel="preload"> 告知浏览器当前导航需要某个资源，应尽快开始提取；是强制浏览器执行的指令；与我们将探讨的其他资源提示不同，它是浏览器必须执行的指令，而不只是可选提示。**
**==允许您继续利用单个文件版本控制和缓存的优势，同时为您提供尽快请求资源的机制。==**

**==使用 \<link rel="preload"> 提取的资源如果 3 秒内未被当前页面使用，将在 Chrome 开发者工具的控制台中触发警告，请务必留意这些警告==**
![警告](https://developers.google.com/web/fundamentals/performance/images/res-prio-timeout.png)

**==使用示例:==**
```javascript {.line-numbers}
<link rel="preload" as="script" href="super-important.js">
<link rel="preload" as="style" href="critical.css"> 
```
**==用例：字体==**
>字体是典型的必须提取且次序靠后的资源示例，通常位于页面加载的若干 CSS 文件的最末尾处，
为了减少用户等待网站文本内容加载的时间，并避免系统字体与您偏好的字体发生冲突，您可以在您的 HTML 中使用 <link rel="preload">，让浏览器立即了解需要某种字体。
**==请注意，此处 crossorigin 的使用非常重要，该属性如果缺失，浏览器将忽略预加载的字体，并执行不同的提取 这是因为浏览器预计将以匿名方式提取字体，只有使用 crossorigin 属性才能以匿名方式发出预加载请求。==**
```javascript {.line-numbers}
<link rel="preload" as="font" crossorigin="crossorigin" type="font/woff2" href="myfont.woff2">
```

***

**==预连接：==**
**\<link rel="preconnect"> 告知浏览器您的页面打算与另一个起点建立连接，以及您希望尽快启动该过程。**
**==注：实际上，还有一种与连接相关的 \<link> 类型： \<link rel="dns-prefetch">。 此类型仅处理 DNS 查询，因此它属于 \<link rel="preconnect"> 的小型子集，但因其受浏览器的支持更广泛，可作为不错的回退方案。 使用方法完全一样： \<link rel="dns-prefetch" href="https://example.com">==**

**==预提取：==**
1. **\<link rel="prefetch">**
1. **\<link rel="preload">**
1. **\<link rel="preconnect">**

