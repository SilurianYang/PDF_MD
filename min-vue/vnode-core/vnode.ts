import { VNodeTS } from "./ts/options";

export function createVNode(
    tag:string,
    props:object|null,
    children:string|Array<VNodeTS>
):VNodeTS{
    return {
        el:null,
        tag,
        props:props||{},
        children
    }
}

export function setProps(
    name:string,
    value:string|Function,
    el:Element
):void{
    if(name.startsWith('on')){       //事件
        el.addEventListener(name.replace('on','').toLowerCase(),value as EventListenerOrEventListenerObject);
    }else{
        el.setAttribute(name,value as string);
    }
}

export function removeProps(
    name:string,
    value:string|Function,
    el:Element
):void{
    if(name.startsWith('on')){       //事件
        el.removeEventListener(name.replace('on','').toLowerCase(),value as EventListenerOrEventListenerObject);
    }else{
        el.removeAttribute(name);
    }
}

export function mountElement(
    vnode:VNodeTS
):Element{
    const {tag,props,children}=vnode;
    const el=(vnode.el=document.createElement(tag));

    for(const [key,value] of Object.entries(props)){
        setProps(key,value,el);
    }

    if(typeof children==='string'){
        const childEl=document.createTextNode(children);
       el.appendChild(childEl);
    }else{
        children.forEach(vnode=>{
            const childEl=mountElement(vnode);
            el.appendChild(childEl);
        })
    }
    return el
}

export function mount(
    vnode:VNodeTS,
    el:string|Element
):(newVnode:VNodeTS)=>void{
    if(typeof el === 'string'){
       el= document.querySelector(el);
    }
    const subTree=mountElement(vnode);;
    el.appendChild(subTree);
    let oldVnode=vnode;
    return (newVnode)=>{
        diff(newVnode,oldVnode);
    }
}

export function diff(
    newVnode:VNodeTS,
    oldVnode:VNodeTS
){
    const {tag:oldTag,props:oldProps,el:oldEl,children:oldChildren}=oldVnode;
    const {tag:newTag,props:newProps,el:newEl,children:newChildren}=newVnode;

    if(oldTag!==newTag){        //节点完全不一样，直接替换
        const newTree=mountElement(newVnode);
        oldEl.replaceWith(newTree);
    }else{  // tag 相等需要对比 props 和 children
        for(const [newKey,newValue] of Object.entries(newProps)){
            if(!Reflect.has(oldVnode,newKey)){      //没有新属性，需要添加
                setProps(newKey,newValue,oldEl);
            }
        }
        for(const [oldKey,oldValue] of Object.entries(oldProps)){
            if(!Reflect.has(newVnode,oldKey)){
                removeProps(oldKey,oldValue,oldEl);
            }
        }
    }

    if(typeof newChildren === 'string' && typeof oldChildren !== 'string' ){       
        // TODO
        //这里还需把之前的事件移除
        const childEl=document.createTextNode(newChildren);
        oldEl.appendChild(childEl);
    }

    if(Array.isArray(newChildren) && typeof oldChildren === 'string'){
        newChildren.forEach(vnode=>{
            const childEl=mountElement(vnode);
            oldEl.appendChild(childEl);
        })
    }

    if(Array.isArray(newChildren) && Array.isArray(oldChildren)){
        oldChildren.forEach(vnode=>{
            diff(vnode);
        })
    }
}