export default (tagName, {
    attrs = {},
    children = []
} = {}) => {
    const vElm = Object.create(null);
    return Object.assign(vElm, {
        tagName,
        attrs,
        children
    })

}