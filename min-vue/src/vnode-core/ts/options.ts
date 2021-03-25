export type VNodeTS={
    tag:string;
    props:object;
    children:string|Array<VNodeTS>,
    el?:null|Element
}