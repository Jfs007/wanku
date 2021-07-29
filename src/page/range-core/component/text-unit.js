
import Base from './base.js';
import { guid } from '../lib/util';
export default class textUnit extends Base {
    constructor(options) {
        super(options);
        // 评论数组
        this.comments = [...(options.comments || [])];
        // 文本
        this.text = options.text;
        this.guid = guid();
    }
    isLineFeed() {
        return this.text == '\n'
    }
    setComments(id) {
        let has = this.comments.find(_ => _ == id);
        if(has) return;
        this.comments.push(id);
    }

}