# let、const、var、上下文环境

#### 前言

> 啥也不说了，直接进入主题。前两天讲到了**调用栈**和**事件队列**。今天就来讲讲一串小代码是怎么执行的？他从**创建**到**执行**到**结束**都做了些啥。此文将讲到**功能、模块、this、上下文环境、闭包、范围链** 等等....

## 先睹为快

```javaScript {.line-numbers}
 var name="hhyang";
 var age=21;
 function getUser(){
     return {
         name,
         age
     }
 }
```

> 看上面的代码，很简单。第一眼声明了两个变量，还有一个名为 getUser 的方法，该方法返回 name，和 age。苗眼一看，没错是这样的。那 JavaScript 引擎在解析这段代码的时候是怎么样的一个过程呢，**如果你已经知道，那可以跳过这篇文章**。没有则继续！想想他都做了写什么？看下面代码

## Creation 阶段

```javaScript {.line-numbers}
 var name="hhyang";
 var age=21;
 function getUser(){
     return {
         name,
         age
     }
 }
 //------------------------
 //           ↓   ↓

        window:object
        this: window
        name: undefined
        age: undefined
        getUser:fun()
```

> 从上面的代码我们可以看出 JavaScript 引擎运行代码时创建的第一个执行上下文称为“全局执行上下文”。最初这个执行上下文将包含两个东西 - 全局对象和一个名为的变量**this**。**this**将引用全局对象，**window**这里使用**object**表示。可以看出 Creation 阶段 JavaScript 引擎做了 4 个处理

1. 创建一个全局对象。
1. 创建一个名为“this”的对象。
1. 为变量和函数设置内存空间。
1. 在内存中放置任何函数声明时，为变量声明分配默认值“undefined”。

## Execution 阶段
> 此时JavaScript引擎逐行开始执行我们的代码，逐条执行。遇到异步api则往异步队列中扔（详细，请见第二篇，event-loop.md）。逐条执行并开始赋值，当JavaScript引擎解析到函数时，发现并没有调用此函数的同时，则只是略过。因为在Creation阶段的时候已经分配好内存中函数的引用。

##### 1.看下面一个栗子，当前JavaScript引擎解析到函数时，做了那些处理。
```javaScript {.line-numbers}
    var name="hhyang";
    function getName(){
        return name
    }
    getName();
```
 JavaScript引擎在解析函数的时候和我们之前讨论到的**Creation阶段几乎一致**。怎么说,看解析图
```javaScript {.line-numbers}
    var name="hhyang";
    function getUser(){
        var age=21;
        return name
    }
    getUser();
//------------------------
//           ↓   ↓
        window:object
        this:window
        name:undefined
//              -----> getUser内部 Creation
                    arguments:{ length: 0 }
                    this:window
                    age:undefined
```
> 从上面的代码中我们可以看到函数内部创建的时候少去了一步，那就是创建全局上下文对象。所以可知每当创建一个**Function Execution Context**时，JavaScript引擎都会

~~1.创建一个全局对象。~~
1. 创建一个参数对象。
1. 创建一个名为“this”的对象。
1. 为变量和函数设置内存空间。
1. 在内存中放置任何函数声明时，为变量声明分配默认值“undefined”。

###### 当然Execution阶段也是一样的，只不过Function执行完成后会弹出调用栈。不管Function中调用多少层Function 也是一样的（只要保证不会栈溢出）。

##### 2.再看一个栗子，如果我们忘函数里面传值后，当前这个值会是怎么的表现呢？
```javaScript {.line-numbers}
    var name="hhyang";
     var age=21;
    function getUser(age){
        return `${name}今年${age}岁`
    }
    getUser(age);
//------------------------
//           ↓   ↓
        window:object
        this:window
        name:undefined
        age:undefined
//              -----> getUser内部 Creation
                        arguments:{ 0:21,length: 0 }
                        this:window
                        age:21
```
###### 从上面栗子我们可以看到，**age**虽然它声明在全局上下文中,但是当我们作为参数传参的时候，该变量是定义在方法体里面的。为什么呢？来看看下一个出场的**Scopes**。

## Scopes
#### MDN解释
> 当前执行的背景。值和表达式 “可见”或可以引用的上下文。如果变量或其他表达式不是“在当前范围内”，则它不可用。范围也可以在层次结构中分层，以便子范围可以访问父范围，但反之亦然。 
#### 我的解释
> 说白了，就是当前执行的上下文。在上下文下，层级越深，能力越强。越能访问外层的东西。可以说成一个**范围**。

#### 像这样？

```javaScript {.line-numbers}
    function first () {
    var name = 'hh'
    console.log(name)
    }
    function second () {
    var name = 'yang'
    console.log(name)
    }
    console.log(name)
    var name = 'hhyang'
    first()
    second()
    console.log(name)
```
> 运行上面的代码我们可以得到**undefined**、**hh**、**yang**、**hhyang**。其实我们在运行**first()** 的时候尝试声明并更改**name**的时候，通过**Scope**链找到上下文中的**name**属性，也一并更改了。当次方法运行完毕后并弹出调用栈后。全局**name**改回hhyang。执行**first()** 时全局上下文name值随**first()** 的name值变动而变动。由**undefined**变为**hh**再变成**hhyang**。

#### 或者这样？
```javaScript {.line-numbers}
    var name = 'hhyang'

    function getName () {
    console.log(name)
    }
    getName()
```
> **getName** 方法内**name**值为**defined**？不存在。如果JavaScript引擎无法在函数的执行上下文中找到本地变量，它会查找该变量的最近父执行上下文。此查找链将一直持续到引擎到达全局执行上下文。在这种情况下，如果全局执行上下文没有变量，它才会抛出一个引用错误。

#### 特殊情况
> 之前我们了解到，在函数内部创建的变量是本地作用域的，一旦函数的执行上下文从执行堆栈中弹出，它们就不能（**大部分**）被访问。现在是时候深入研究“ **大部分** ”了。如果你有一个嵌套在另一个函数内的函数，那么这种情况并非如此。在这种情况下，即使从执行堆栈中删除了父函数的执行上下文，子函数仍然可以访问外部函数的作用域。那就是所谓的**闭包**。

```javaScript {.line-numbers}
    var count = 0
    function makeAdder(x) {
    return function inner (y) {
        return x + y;
    };
    }

    var add5 = makeAdder(5);
    count += add5(2)
```
> 请注意，在makeAdder执行堆栈中弹出执行上下文后，JavaScript Visualizer会创建所谓的a Closure Scope。其中Closure Scope包含makeAdder执行上下文中存在的相同变量环境。发生这种情况的原因是因为我们有一个嵌套在另一个函数内部的函数。在我们的示例中，inner函数嵌套在函数内部makeAdder，因此在变量环境中inner创建。即使在执行堆栈中弹出执行环境之后，由于创建了执行环境，因此可以访问变量（通过范围链）

## Scopes总结一下下
> 如果本地执行上下文中不存在变量，则JavaScript引擎逐个执行并检查每个单独的父执行上下文的过程称为Scope Chain。JavaScript Visualizer通过使每个新的执行上下文缩进并具有唯一的彩色背景来显示范围链。在视觉上，您可以看到任何子执行上下文都可以引用位于其任何父执行上下文中的任何变量，但反之亦然。**（这句话网上copy的，不过大概意思就是这样）**




## 全局变量
```javaScript {.line-numbers}
    var ages=21;
    var address='深圳南山';
    function getUser(){
    number=110;
    console.log(address);
    }
    window.getUser();
    console.log(window.number);
```
> 在浏览器中，只要在全局执行上下文中创建变量（在任何函数之外），该变量将作为属性都会添加到window对象上。还有一种情况下，没有通过（**var**，**let**或**const**）声明的变量，该变量也将被添加为全局对象上的属性。


## 再谈面试

> 有时候面试官可能会出写这样的题，请看下面代码：

```javaScript {.line-numbers}
    console.log(name);  //undefined
    console.log(getAges);   //undefined
    console.log(getName);   //fun()
    console.log(getAddress);    //ReferenceError
    var name="hhyang";
    var age=21;
    var address='深圳南山';
    function getName(){
       return name;
    }
    var getAges=function(){
        return age;
    }
    let getAddress =function(){
        return address;
    }
```
 > 为什么name打印出来是**undefined**,getAges方法打印出来也是**undefined**？而getName方法打印出来的确实一个方法体呢？有看明白**Creation阶段**的老铁们就应该知道为什么了。没看明白的老铁没关系，咋们慢慢来。name、getAges都是有**var**关键字声明的，当JavaScript引擎在创建这段代码的时候，上面说了他会做4个步骤。可知 name和getAges提升了，并赋值给了默认值**undefined**。而getName方法略有不同，它在JavaScript引擎创建的时候就被声明，并赋值了，所以它打印的时候直接找到内存块，打印出此方法体。ok！那由**let**关键字声明的方法，那为什么会报**ReferenceError**这样的错误呢？这个问题一会再说。保留！

