
import Base from './base.js';
import { guid } from '../lib/util';
export default class textUnit extends Base {
    constructor(options) {
        super(options);
        // 评论数组
        this.comments = [...(options.comments || [])];
        // this.fontSize = '';
        // 文本
        this.text = options.text;
        // 类型 img / text
        this.type = options.type || 'text';
        this.guid = guid();
        this._copy = [];
    }
    isLineFeed() {
        return this.text == '\n'
    }
    isText() {
        return this.type == 'text';
    }
    setComments(id) {
        let has = this.comments.find(_ => _ == id);
        if (has) return;
        this.comments.push(id);
    }
    getFissionModal(start, end, text) {
        // let text = this.text || text;
        let textLength = this.getTextLength();
        let progress = [];
        if (start == end) return progress;
        if (start) {
            progress.push({ sub: [0, start] });
        } else {
            start = 0;
        }

        progress.push({ sub: [start, end ? end - start : textLength - start],  isRange: true});
        if (end && end != textLength) {
            progress.push({ sub: [end] });
        }
        return progress;
    }
    fission(start, end) {
        let text = this.text;
        if(!this.isText()) return [];
        
        let modal = this.getFissionModal(start, end, text);
        modal = modal.map(_ => {
            return { ..._, text: text.substr(..._.sub) };
        });
        return modal;
    }

    getTextLength() {
        if (this.isText()) {
            return +this.text.length;
        }
        return 0;

    }



}