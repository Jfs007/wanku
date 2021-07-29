// 解析器
/**
 *  接受一段dom 解析成段落 
 *
 */

import { isTextNode, getComputedStyle, getTextNode } from './dom';
export let render = () => {

}

export let parse = (dom) => {
    let vNode = {};
    let _parse = (node, vNode) => {
        vNode.nodeType = node.nodeType;
        vNode.nodeValue = node.nodeValue;
        vNode.nodeName = node.nodeName;
        let cstyle = getComputedStyle(node);
        vNode.blockNode = cstyle.display == 'block' ? 1 : 0;
        if(vNode.blockNode == 1) {
            let textNode = getTextNode(node);
            // textNode
        }


        let childNodes = node.childNodes;
        if (childNodes && childNodes.length) {
            vNode.children = [];
            for (let i = 0; i < childNodes.length; i++) {
                vNode.children[i] = {};
                return _parse(childNodes[i], vNode.children[i]);
            }
        } else {
            return vNode;
        }
    }
    vNode.nodeType = dom.nodeType;
    vNode.textNode = dom.textNode;
    vNode.nodeName = dom.nodeName;
    _parse(dom, vNode);






    return vNode;
}

