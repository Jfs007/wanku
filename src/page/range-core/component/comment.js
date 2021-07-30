import Base from './base.js';
export default class Comment extends Base {
    constructor(options) {
        super(options);
        this.id = options.id;
        this.text = options.text || '';
        this.textRange = options.textRange || [];
    }
}