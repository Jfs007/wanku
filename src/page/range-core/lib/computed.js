import { getRange } from './index';


export let computedBounday = (rect, e) => {
    let startOffset = rect.x;
    let endOffset = rect.width + startOffset;
    let topOffset = rect.y;
    let bottomOffset = topOffset + rect.height;
    if (e.x >= startOffset && e.x <= endOffset && e.y >= topOffset && e.y<= bottomOffset) {
        return true;
    } else {
        return false;
    }
}
export let boundayIntimateDir = (rect, e) => {
    let startOffset = rect.x;
    let offsetMiddle = startOffset + (rect.width / 2);
    if (e.x < offsetMiddle) return 'left';
    return 'right';
}



export let computedRangeBoundary = (e, textNode) => {
    let range = getRange();
    let value = textNode.nodeValue;
    let boundary = {};
    range.setStart(textNode, 0);
    range.setEnd(textNode, value.length);
    let rect = range.getBoundingClientRect();
    if(!computedBounday(rect, e)) {
        let dir = boundayIntimateDir(rect, e);
        boundary = {
            dir,
            index: dir == 'left' ? 0 : value.length,
            textNode,
            range,
            rect: {
                y: rect.y,
                x: dir == 'left' ? rect.x : rect.x + rect.width,
                height: rect.height
            },
        };
        return boundary;
    }
    for (let i = 0; i < value.length; i++) {
        range.setStart(textNode, i);
        range.setEnd(textNode, i + 1);
        let rect = range.getBoundingClientRect();
        if (computedBounday(rect, e)) {
            let dir = boundayIntimateDir(rect, e);
            boundary = {
                dir,
                index: dir == 'left' ? i : i + 1,
                textNode,
                range,
                rect: {
                    y: rect.y,
                    x: dir == 'left' ? rect.x : rect.x + rect.width,
                    height: rect.height
                }
                
            };
            break;
        } 
    }
    return boundary;
}

// export 