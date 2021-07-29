export default class Base {
    constructor(options) {
        
    }
    init() {
        for (let key in options) {
            this[key] = options[key];
        }

    }
}