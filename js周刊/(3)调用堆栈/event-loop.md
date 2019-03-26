# 事件队列

#### 什么是事件队列？

> 我们有说过什么是 **调用栈** ，当调用栈中事件量很大的情况下，很长时间后面的代码排不上队，浏览器一般就会提示你无响应之类的玩意。那为了减少这种情况的发生，于是就带来了异步队列。直接使用生活中的栗子说明， **有一家饭店每天中午都有很多人去吃饭，而去这里的人呢都很有素质。每个人都会排队打饭，偶尔这家饭店很火爆。排队的人太多了，饭店里面的人手都忙不过来。这时打饭的阿姨走到门口大声的说到，今天中午太火爆了，我们忙不过来了。如果后面有不想等的就去隔壁吃吧。晚上的时候这家饭店就想着每天都这么多人的话，那我制定一条规定如何呢？反正都是为了赚钱，开 VIP 吧，怎么说？vip 排一队，非 VIP 排一队。优先给 VIP 客户打饭，非 vip 慢慢来。但是呢非 VIP 的话我们还是给他开一条通道，比如说饿的不行的。打完 VIP 的马上给他打。** 这个栗子看的懂也就这样了 看不懂也没办法

#### 示例代码
```javaScript {.line-numbers}
    setTimeout(()=>{
        console.log(1)	
    },0)
    new Promise(resolve=>{
        console.log(2);
        callBack(resolve)
    }).then(res=>{
        console.log(res)
    })
    function callBack(func){
        console.log(3);
        func(4);
    }
    console.log(5);     //输出结果 2、3、5、4、1

```

#### 表格解说

###### 1. 一开始，一切都是空的
 
|    code   | call stack    |    event loop  |
|    ----    |   ----    |   ----    | 
|   示例代码    |   空  |   空  |

###### 2. 开始了，setTimeout进入调用堆栈,执行甩入异步队列
|    code   | call stack    |    event loop  |
|    ----    |   ----    |   ----    |  
|   示例代码    |  setTimeout   |   timeout,0  | 

###### 3. 执行promise,压入调用栈，等待执行里面的代码
|    code   | call stack    |    event loop  |
|    ----    |   ----    |   ----    |  
|   示例代码    |  setTimeout<br>Promise   |   timeout,0  | 

###### 4. 执行promise里面的代码并压入调用栈(-)
|    code   | call stack    |    event loop  |
|    ----    |   ----    |   ----    |  
|   示例代码    |  setTimeout<br>Promise<br/> console.log(2)   |   timeout,0  | 
###### 5. 执行promise里面的代码并压入调用栈(二)
|    code   | call stack    |    event loop  |
|    ----    |   ----    |   ----    |  
|   示例代码    |  setTimeout<br>Promise<br/> console.log(2)<br/>callBack   |   timeout,0  | 
###### 6. 调用栈执行callBack方法并执行代码(一)
|    code   | call stack    |    event loop  |
|    ----    |   ----    |   ----    |  
|   示例代码    |  setTimeout<br>Promise<br/> console.log(2)<br/>callBack<br/> console.log(3)   |   timeout,0  | 
###### 7. 调用栈执行callBack方法并执行代码，执行回调(二)
|    code   | call stack    |    event loop  |
|    ----    |   ----    |   ----    |  
|   示例代码    |  setTimeout<br>Promise<br/> console.log(2)<br/>callBack<br/> console.log(3)<br/> func(4)   |   timeout,0  | 
###### 8. 调用栈执行then 注册事件，等待promise状态响应。注册事件完成默认提到异步队列定端
|    code   | call stack    |    event loop  |
|    ----    |   ----    |   ----    |  
|   示例代码    |  setTimeout<br>Promise<br/> console.log(2)<br/>callBack<br/> console.log(3)<br/> func(4)   | then <br/> timeout,0  | 
###### 9. 调用栈压入console.log(5)
|    code   | call stack    |    event loop  |
|    ----    |   ----    |   ----    |  
|   示例代码    |  setTimeout<br>Promise<br/> console.log(2)<br/>callBack<br/> console.log(3)<br/> func(4) <br/>console.log(5)  | then <br/> timeout,0  | 
###### 10. 调用栈开始排队执行setTimeout，这是setTimeout中的代码已经去异步队列了，无视。
|    code   | call stack    |    event loop  |
|    ----    |   ----    |   ----    |  
|   示例代码    |  Promise<br/> console.log(2)<br/>callBack<br/> console.log(3)<br/> func(4) <br/>console.log(5)  | then <br/> timeout,0  | 
###### 11. 调用栈执行promise，注册3个状态，并执行里面的代码。最后等待回调到then中
|    code   | call stack    |    event loop  |
|    ----    |   ----    |   ----    |  
|   示例代码    | console.log(2)<br/>callBack<br/> console.log(3)<br/> func(4) <br/>console.log(5)  | then <br/> timeout,0  | 
###### 11. 调用栈执行console.log(2) 打印出 <span style="color:#f00">2</span>
|    code   | call stack    |    event loop  |
|    ----    |   ----    |   ----    |  
|   示例代码    | callBack<br/> console.log(3)<br/> func(4) <br/>console.log(5)  | then <br/> timeout,0  | 
###### 12. 调用栈执行callBack 并开始执行方法内的代码
|    code   | call stack    |    event loop  |
|    ----    |   ----    |   ----    |  
|   示例代码    |  console.log(3)<br/> func(4) <br/>console.log(5)  | then <br/> timeout,0  | 
###### 13. 调用栈执行callBack中的代码 并执行console.log(3)，打印<span style="color:#f00">3</span>
|    code   | call stack    |    event loop  |
|    ----    |   ----    |   ----    |  
|   示例代码    |   func(4) <br/>console.log(5)  | then <br/> timeout,0  | 
###### 14. 调用栈执行callBack中的代码 回调 func(4)，promise状态完成，等待执行then。
|    code   | call stack    |    event loop  |
|    ----    |   ----    |   ----    |  
|   示例代码    |   console.log(5)  | then <br/> timeout,0  | 
###### 15. 调用栈执行完成promise 本来应该执行then函数，因为then函数在异步队列中，并排在第一位。发现调用栈的代码还没执行完，慢着。等我把这变执行完了，再优先执行你。执行console.log(5) 打印 <span style="color:#f00">5</span>
|    code   | call stack    |    event loop  |
|    ----    |   ----    |   ----    |  
|   示例代码    |   空  | then <br/> timeout,0  | 
###### 16. 调用栈此时为空，查询异步队列有没有可以执行的代码。发现有可执行的，准备开始压入。注意此时可能timeout,0 已经超过0秒了，但是，但是。。。前面有人排队，你再饿也不能插队，只能等着。此时event loop推送then函数到调用栈中。
|    code   | call stack    |    event loop  |
|    ----    |   ----    |   ----    |  
|   示例代码    |   then  |  timeout,0  |
###### 16. 调用栈发现又有代码了，开始执行调用栈中的代码，无视异步队列的代码，执行then回调函数打印<span style="color:#f00">4</span>，此时调用为空。
|    code   | call stack    |    event loop  |
|    ----    |   ----    |   ----    |  
|   示例代码    |   空  |  timeout,0  |
###### 17. 此时调用栈为空，继续访问异步队列，有可执行的代码吗？有！我帮你推送过去，好的。异步队列推送到调用栈
|    code   | call stack    |    event loop  |
|    ----    |   ----    |   ----    |  
|   示例代码    |    timeout,0  |   空  |
###### 18. 调用栈不为空，执行timeout中的代码，打印<span style="color:#f00">1</span>,此时调用栈和异步队列都为空。
|    code   | call stack    |    event loop  |
|    ----    |   ----    |   ----    |  
|   示例代码    |    空  |   空  |
###### 19. 调用栈发现列队为空时，往异步队列访问，有代码吗？没有，好我一会再过来，反反复复。。。。
|    code   | call stack    |    event loop  |
|    ----    |   ----    |   ----    |  
|   示例代码    |    空  |   空  |

### 此块代码执行完，结束！