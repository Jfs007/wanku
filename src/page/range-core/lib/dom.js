



export let isTextNode = (node) => {
    return node.nodeType == 3;
}
export let isElementNode = (node) => {
    return node.nodeType == 1;
}

export let getComputedStyle = (node) => {
    if (isElementNode(node)) return window.getComputedStyle(node);
    return {}
}

// export let isBlock
export let getTextNode = (el) => {
    let textNode = null;
    let child = el.childNodes;
    for (let i = 0; i < child.length; i++) {
        let node = child[i];
        if (isTextNode(node)) {
            textNode = node;
            break;
        }
    }
    return textNode;
}

export let getContainerNode = (textNode) => {
    if (isTextNode(textNode)) {
        return textNode.parentNode;
    }
    return textNode.parentNode;
    // return textNode;
}


