const renderElem = ({
    attrs,
    children,
    tagName
}) => {
    let $el = document.createElement(tagName);
    // 设置节点属性
    for (const [k, v] of Object.entries(attrs)) {
        $el.setAttribute(k, v);
    }
    //设置儿子节点
    for (const item of children) {
        $el.appendChild(render(item));
    }
    return $el;
}
const render = (vnode) => {
    if (typeof vnode == "string") { //是一个文本节点
        return document.createTextNode(vnode);
    };
    return renderElem(vnode);
}

export default render