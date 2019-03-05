#### （一）字符串 trimStart()、trimEnd()

> 相对于以前 **trim()** 去除前后空格，更方便，更灵活。**trimStart()** 去除前空格、**trimEnd()** 去除后空格。

```javaScript {.line-numbers}
    const one = "      hello and let ";
    const two = "us begin.        ";
    console.log( one.trimStart() + two.trimEnd() ) // "hello and let us begin."
```

#### （二）更大的数字 BigInt [更多示例](https://developers.google.com/web/updates/2018/05/bigint)

> 在我们常用的 **number** 类型中最大的值即为 **Number.MAX_SAFE_INTEGER** 等于 **9007199254740991**，超过 **9007199254740992** 的运算即无法实现。这时候就该我们 **BigInt** 类型上场了。

```javaScript {.line-numbers}
    //以下为三种声明方式
    let numberMax1=9007199254740991n;
    let numberMax2=BigInt(9007199254740991);
    let numberMax3=BigInt('9007199254740991');

    //运算方式 + - * / ** -- % 都支持
    numberMax1++    //9007199254740992n
    numberMax1+2n     //9007199254740993n
    numberMax1*2n       //18014398509481982n
    numberMax1/2n       //4503599627370495n
    numberMax1**2n      //81129638414606663681390495662081n
    numberMax1--        //9007199254740990n
    numberMax1%2n       //1n
```

###（三）用 flat()和平坦阵列 flatMap()

> **flat()** 设计用于获取一组值，其中一些值可能是更多数组，并返回一个新的一维数组。默认传值为1，参数小于等于0 则不扁平，大于数组类型即扁平为一维数组。
**flatMap()** 类似于 **map()**，但回调可以返回一个数组，最终结果将是一维数组而不是嵌套数组。
```javaScript {.line-numbers}
    //flat()
    let arr = [ "a", ["b", "c"], ["d", ["e", "f"]]];
    let newArr = arr.flat( 2 );
    console.log( newArr ); // [ "a", "b", "c", "d", "e", "f" ]

    //flatMap()
    const scattered = [ "my favorite", "hamburger", "is a", "chicken sandwich" ];
    const huh = scattered.map( chunk => chunk.split( " " ) );
    console.log( huh );  //[ [ "my", "favorite" ], [ "hamburger" ], [ "is", "a" ], [ "chicken", "sandwich" ] ]

    const better = scattered.flatMap( chunk => chunk.split( " " ) );
    console.log( better ); // [ "my", "favorite", "hamburger", "is", "a", "chicken", "sandwich" ]
```
