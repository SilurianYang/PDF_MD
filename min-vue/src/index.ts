import { h } from "./vnode-core/h";
import { mount } from "./vnode-core/vnode";

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

const vnode2= h('div',{
    class:'box'
},[
    h('div',{
        class:'er_div'
    },[
        h('p',{
            onclick:()=>{
                alert('二次更新')
            }
        },'这是二次更新后的数据')
    ])
]);

window.h=h;

const patch=window.patch =mount(vnode,document.querySelector('#app') as Element);


console.log(vnode)

setTimeout(()=>{
    patch(vnode2);
},3000)