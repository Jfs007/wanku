// new Event(el, vm)
// el 需要绑定dom 不必填
// vm 当前组件对象 不必填
let isVue = (vm) => {
    if (!vm) return false
    if (vm.constructor.name === 'VueComponent') {
        return true
    }
    return false
}
let getPath = (component) => {
    let getName = (component) => {
        let name = component.$options.name
        return name ? ('<' + name + '/>') : '<anonymous/>'
    }
    let path = []
    if (!component.DID_NOT_SET) {
        path.push(getName(component))
        let parent = component.$parent
        while (parent) {
            let name = getName(parent)
            path.push(name ? name : '<anonymous/>')
            parent = parent.$parent
        }
        path[path.length - 1] = '<root/>'
    } else {
        path = ['<anonymous/>']
    }
    let path_str = ''
    path.map((pt, i) => {
        let n = ''
        for (let o = i; o > 0; o--) {
            n += ' '
        }
        path_str += ((i > 0 ? '\n' : '') + n + pt)
    })
    return path_str + '\n'
}
class Event {
    constructor(el, component) {
        if (isVue(el)) {
            component = el
            el = undefined
        }
        this.el = el
        this.component = component || { $options: { name: 'NO_NAME' }, DID_NOT_SET: true }
        this.eventLists = {
        }
    }
    on(type, fn) {
        let evts = this.eventLists[type]
        if (evts && evts.length) { evts.push(fn) }
        else {
            this.eventLists[type] = [fn]
        }
        return this.eventLists[type].slice(-1)[0]
    }
    off(type) {
        let evts = this.eventLists[type]
        if (evts && evts.length) { evts = [] }
        else {
            console.warn('no that events')
        }
        if (process.env.NODE_ENV === 'development') {
            // console.log(window.location.href)
            console.info("%c%s",
                "color: #4da1ff", `${getPath(this.component)}已移除${type}事件`)
        }
        return this.eventLists[type].slice(-1)[0]
    }
    trigger(type, args) {
        let evts = this.eventLists[type]
        if (evts && evts.length) {
            evts.map((e, index) => {
                e(args)
            })
        }
    }
    addEvent(el, type, fn) {
        if (typeof el == 'string') {
            fn = type
            type = el
            el = this.el
        }
        let eventFn = this.on(type, fn)
        el.addEventListener(type, eventFn)
    }
    removeEvent(el, type) {
        if (typeof el == 'string') {
            type = el
            el = this.el
        }
        let evts = this.eventLists[type]
        if (evts && evts.length) {
            evts.map((e, index) => {
                el.removeEventListener(type, e)
            })
            this.off(type)
        } else {
            console.warn('no that events')
        }
    }
}
export default Event
