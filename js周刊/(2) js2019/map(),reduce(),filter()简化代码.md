#### (一) 数组去重

```javaScript {.line-numbers}
    const values = [3, 1, 3, 5, 2, 4, 4, 4];
    const uniqueValues = [...new Set(values)];  //[3, 1, 5, 2, 4]

    const arrA = [1, 4, 3, 2];
    const arrB = [5, 2, 6, 7, 1];
    [...new Set([...arrA, ...arrB])]; // returns [1, 4, 3, 2, 5, 6, 7]

```

#### (二) 对象去重

```javaScript {.line-numbers}
    const users = [
    { id: 11, name: 'Adam', age: 23, group: 'editor' },
    { id: 47, name: 'John', age: 28, group: 'admin' },
    { id: 85, name: 'William', age: 34, group: 'editor' },
    { id: 97, name: 'Oliver', age: 28, group: 'admin' }
    ];
    const m = new Map();
    users.filter(it=>m.set(it.age,it));
    [...m.values()] //[{ id: 11, name: 'Adam', age: 23, group: 'editor' },{ id: 97, name: 'Oliver', age: 28, group: 'admin' },{ id: 85, name: 'William', age: 34, group: 'editor' }]
    [...m.keys()]   //[23,28,34]
```

#### (三) 简单搜索（区分大小写）

```javaScript {.line-numbers}
    const users = [
    { id: 11, name: 'Adam', age: 23, group: 'editor' },
    { id: 47, name: 'John', age: 28, group: 'admin' },
    { id: 85, name: 'William', age: 34, group: 'editor' },
    { id: 97, name: 'Oliver', age: 28, group: 'admin' }
    ];
    let res = users.filter(it => it.group.includes('oli'));
    console.log(res);     //[]
```

#### (四) 简单搜索（不区分大小写）

```javaScript {.line-numbers}
    const users = [
    { id: 11, name: 'Adam', age: 23, group: 'editor' },
    { id: 47, name: 'John', age: 28, group: 'admin' },
    { id: 85, name: 'William', age: 34, group: 'editor' },
    { id: 97, name: 'Oliver', age: 28, group: 'admin' }
    ];
    let res = users.filter(it => new RegExp('oli', "i").test(it.name));
    console.log(res);     //[{ id: 97, name: 'Oliver', age: 28, group: 'admin' }]
```

#### (五) 数组中是否匹配当前条件

```javaScript {.line-numbers}
    const users = [
    { id: 11, name: 'Adam', age: 23, group: 'editor' },
    { id: 47, name: 'John', age: 28, group: 'admin' },
    { id: 85, name: 'William', age: 34, group: 'editor' },
    { id: 97, name: 'Oliver', age: 28, group: 'admin' }
    ];
    const   hasAdmin = users.some(user => user.group === 'admin');
    console.log(hasAdmin)  //true
```

#### (六) 提取数组中每个项的给定键的唯一值

```javaScript {.line-numbers}
    const users = [
    { id: 11, name: 'Adam', age: 23, group: 'editor' },
    { id: 47, name: 'John', age: 28, group: 'admin' },
    { id: 85, name: 'William', age: 34, group: 'editor' },
    { id: 97, name: 'Oliver', age: 28, group: 'admin' }
    ];
    const listOfUserGroups = [...new Set(users.map(it => it.group))];
    console.log(listOfUserGroups)  //['editor', 'admin'];
```

#### (七) 对象 key value 反转

```javaScript {.line-numbers}
    const cities = {
    Lyon: 'France',
    Berlin: 'Germany',
    Paris: 'France'
    };
    let countries = Object.keys(cities).reduce((acc, k) => {
    let country = cities[k];
    acc[country] = acc[country] || [];
    acc[country].push(k);
    return acc;
    }, {});
    console.log(countries)  //{"France":["Lyon","Paris"],"Germany":["Berlin"]}
```

#### (八) 从摄氏度数组中创建一个华氏数值数组

```javaScript {.line-numbers}
    const celsius = [-15, -5, 0, 10, 16, 20, 24, 32]
    const fahrenheit = celsius.map(t => t * 1.8 + 32);
    console.log(fahrenheit)     //[5, 23, 32, 50, 60.8, 68, 75.2, 89.6]
```

#### (九) 将对象编码为查询字符串

```javaScript {.line-numbers}
    const params = {lat: 45, lng: 6, alt: 1000};
    const queryString = Object.entries(params).map(p => {
        return encodeURIComponent(p[0]) + '=' + encodeURIComponent(p[1])
    }).join('&');
    console.log(queryString);       //lat=45&lng=6&alt=1000
```

#### (十) 使用指定的键将用户表打印为可读字符串

```javaScript {.line-numbers}
    const users = [
    { id: 11, name: 'Adam', age: 23, group: 'editor' },
    { id: 47, name: 'John', age: 28, group: 'admin' },
    { id: 85, name: 'William', age: 34, group: 'editor' },
    { id: 97, name: 'Oliver', age: 28, group: 'admin' }
    ];
    const jsonStr=users.map(({id,name,age,group})=>`\r\n${id} ${name} ${age} ${group}`).join('');
    console.log(jsonStr)    // 11 Adam 23 editor
                        // 47 John 28 editor
                        // 85 William 34 editor
                        // 97 Oliver 28 editor
```

#### (十一) 数组的交集值

```javaScript {.line-numbers}
    const arrA = [1, 4, 3, 2];
    const arrB = [5, 2, 6, 7, 1];
    arrA.filter(it => arrB.includes(it)); // returns [1, 2]
```

#### (十二) 排除对象中的某个值

```javaScript {.line-numbers}
    const noPassword = ({
        password,
        ...rest
    }) => rest
    const user = {
        id: 100,
        name: 'hhyang',
        password: 'Password!'
    }
    noPassword(user)        //{id: 100, name: "hhyang"}
```

#### (十三) 动态排除对象中的某个值

```javaScript {.line-numbers}
    const user = {
        id: 100,
        name: 'hhyang',
        password: 'Password!'
    }

    const removeProperty = prop => ({ [prop]: _, ...rest }) => rest
    
    const removePassword = removeProperty('password')
    const removeId = removeProperty('id')
    
    console.log( removePassword(user)) //{id: 100, name: "hhyang"}
    console.log( removeId(user))   //{name: "hhyang", password: "Password!"}
```
#### (十四) 改变对象中默认排序，让某一项置顶或置底

```javaScript {.line-numbers}
    const user = {
        name: 'hhyang',
        password: 'Password!',
        id: 100
    }
    const organize = object => ({name: undefined,...object});
    console.log(organize(user))     //{name: "hhyang", password: "Password!", id: 100}
```
#### (十五) 动态改变对象的某个key

```javaScript {.line-numbers}
    const user = {
        name: 'hhyang',
        password: 'Password!',
        ID: 100
    }
    const renamed = ({ ID, ...object }) => ({ id: ID, ...object })
    console.log(renamed(user))  //main.js:7 {id: 100, name: "hhyang", password: "Password!"}
```
#### (十六) 对象中添加属性有值的

```javaScript {.line-numbers}
    const user = {
        name: 'hhyang',
        ID: 100
    }
    let  password='ispassword';
    const userWithPassword = {
        ...user,
        id: 100,
        ...(password && { password })
    }
    console.log(userWithPassword) //{name: "hhyang", ID: 100, id: 100, password: "ispassword"}
```