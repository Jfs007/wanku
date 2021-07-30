
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
    }
    isLineFeed() {
        return this.text == '\n'
    }
    isText() {
        return this.type == 'text';
    }
    setComments(id) {
        let has = this.comments.find(_ => _ == id);
        if(has) return;
        this.comments.push(id);
    }

    getTextLength() {
        if(this.isText()) {
            return +this.text.length;
        }
        return 0;
       
    }
    

}