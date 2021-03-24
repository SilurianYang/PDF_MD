import { createVNode } from "./vnode";
import { VNodeTS } from "./ts/options";

export function h(
    tag:string,
    props:object|null,
    children:string|Array<VNodeTS>
):VNodeTS{
    return createVNode(tag,props,children);
}





