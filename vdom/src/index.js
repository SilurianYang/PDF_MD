import './style/base.scss';
import girl from '../static/images/girl.jpg';

import createElement from './vdom/createElemt.js';
import render from './vdom/render.js';
import mount from './vdom/mount.js';
import diff from './vdom/diff.js';

let count = 0;
const createApp = (count) => createElement('div', {
    attrs: {
        id: "hhyang",
        name: "hhyang"
    },
    children: [
        createElement('div', {
            children: [
                createElement('h1', {
                    children: [
                        `我是你爸爸${count}`
                    ]
                }),
            ]
        }),
        createElement('input', {
                attrs: {
                    type: "text"
                }
            }),
            String(count),
            createElement('img', {
                attrs: {
                    src: girl,
                },
            })
    ]
});

let oldApp = createApp(count);

let $rootEl = mount(render(oldApp), document.getElementById('root')); //挂载真实dom后并返回当前的dom;



setInterval(() => {
    count++;
    let newApp = createApp(count);

    let patch = diff(oldApp, newApp); //对比”数据“所有的不同之处，并返回一个patch方法处理dom

    $rootEl = patch($rootEl);

    oldApp = newApp;
}, 2000)