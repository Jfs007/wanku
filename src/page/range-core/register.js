
import Events from './lib/event';
import { getRange } from './lib/index';
import { getContainerNode } from './lib/dom';





export default function Register(el) {
    let events = new Events(el);
    events.addEvent('mouseup', () => {
        let selection = window.getSelection();
        if (selection && !selection.isCollapsed) {
            let range = selection.getRangeAt(0);
            events.trigger('range-select', {
                startNode: getContainerNode(range.startContainer),
                endNode: getContainerNode(range.endContainer),
                startOffset: range.startOffset,
                endOffset: range.endOffset,
            });
        }


    });
    return events;
}
