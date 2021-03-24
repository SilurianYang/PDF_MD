import { h } from "./h";
import { mount } from "./vnode";

const vnode= h('div',{
    id:'firstBox',
    data_id:'1'
},[
    h('div',{},[
        h('p',{
            onclick:()=>{
                alert(333)
            }
        },'333'),
        h('span',{id:'box'},'000'),
    ])
]);

const vnode2= h('p',{
    id:'firstBox',
    class:'box'
},[
    h('div',{},[
        h('p',{
            onclick:()=>{
                alert('二次更新')
            }
        },'这是二次更新后的数据')
    ])
]);

const patch=mount(vnode,document.querySelector('#app'));


console.log(vnode)

// setTimeout(()=>{
//     patch(vnode2);
// },3000)