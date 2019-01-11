# 单元测试学习

### 简介说明：
1. **TDD:** 
>    TDD是“测试驱动的开发”（Test-Driven Development）的简称，指的是先写好测试，然后再根据试完成开发。使用这种开发方式，会有很高的测试覆盖率。

 **TDD接口提供以下四个方法:**
```javascript
        suite()   
        test()
        setup()
        teardown()
```
2. **BDD:** 
>    BDD是“行为驱动的开发”（Behavior-Driven Development）的简称，指的是写出优秀测试的最佳实践的总称。

**BDD接口提供以下六个方法:**

```javascript
        describe()
        it()
        before()
        after()
        beforeEach()
        afterEach()
```

### 断言说明：
1. 断言是判断实际值与预期值是否相等的工具。
1. 断言有 **assert**、**expect**、**should** 三种风格，或者称为三种写法

```javascript
    //assert
    assert.equal(event.detail.item,'(item)');

    //expect
    expect(event.detail.item).to.equal('(item)');

    //should 
    event.detail.item.should.equal('(item)');
```
## NPM包列表
####  karma 官网
    https://karma-runner.github.io/3.0/intro/installation.html

####  安装列表

序号    |   名称    |   地址    |   必须    |   备注
----   |    ----    |   ----    |   ----    |   ----
1   |   karma   |     npm install karma --save-dev  |   是  |   
2   |   karma-jasmine |  npm install karma-jasmine --save-dev |   是    |
3   |   karma-chrome-launcher   |   npm  karma-chrome-launcher --save-dev   | 是    |
4   |   jasmine-core    |   npm jasmine-core --save -dev    |   是  |
5   |   karma-cli       |   npm install -g karma-cli    |   否  |   
6   |   chai     |   npm install -g chai      |   否 |    Chai.js同时支持 **assert** **expect** **should** 风格的断言库
7   |   mocha   |   npm install -g mocha      |   否  |   运行测试的工具  **最流行的前端测试框架之一**

### 开始使用
1. 使用mocha直接在node中运行

```javascript
    //test.js
    let add = function (a, b) {
    return a + b
    }
    module.exports = add;

    //test.spec.js
    const test = require('./test');
    const {
        expect
    } = require('chai');
    describe('测试下test', () => {
        it('add方法', () => {
            expect(test(1, 1)).to.equal(2);
        })
    })

    $ mocha 
```
