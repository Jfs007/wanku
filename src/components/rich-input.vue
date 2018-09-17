<template lang="pug">
div
  span( style="fontSize: 16px;lineHeight: 20px") {{renderString}}
  .rich-input
    .complete-down(v-show='isShow&&!noIdent')
      p(@click='select(item)', v-for='item in itemsData')
        | {{item.cate}}/{{item.value}}
    .rich-input__inner.rich-tags(@input='change', :contenteditable='true', @keydown='down', @mousedown='click', v-html='html', ref='rich-input__inner')
</template>
<script>
import {rangeSet} from '../js/dom.js';
function selection() {
  let selection = window.getSelection()
  return selection;
}
function range() {
  
  return selection().getRangeAt(0)
}
function spliceInString(str, charAt, addChar = '') {
  return str.replace(/(\b|\B)/g,
    (a, b, i) => i === charAt ? addChar: '' )
}

export default {
  name: 'ziwan',
  data() {
    return {
      ident: '$',
      isShow: false,
      cusorPos: 0,
      identPos: 0,
      nodeIndex: 0,
      node: null,
      // items: 
      model: [
        // [
        // 'ifa=<br>',
        // 'd'],
        // 'ifa=<br>',
        // 'd'
        // '',
        // { value: '火箭', cate: 'system' },
        // 'c>',
        // { value: '腰带', cate: 'sytem' },
        // '',
        // { value: '狐狸', cate: 'bot' },
        // 'a<11',
        // { value: 'heqi', cate: 'ant'},
        // 'd>222',
        // 'c='
      ],
      renderString: ''

    }
  },
  computed: {
    html() {
      return this.tagParse();
    },
    value() {
      let cusorPos = this.cusorPos;
      return this.node&&this.isShow ? this.node.textContent.substr(this.identPos-1, cusorPos): ''
    },
    noIdent() {
      let reg = /^\$/;
      return !this.value.match(reg)
    },
    itemsData() {
      let value = this.value.replace(/^\$/, '');
      return this.items.filter(item => this.createFilter(item, value));
    },
  },
  props: {
    tagClass: {
      type: String,
      default: 'tag'
    },
    items: {
      type: Array,
      default() {
        return []
      }
    },
    models: {
      type: [Array, String]
    }
  },
  created() {
    this.updateModel(this.models||'');
  },
  mounted() {
    document.designMode == "On"
  },
  methods: {
    updateModel(model) {
      if(typeof model === 'string') {
        this.model = this.stringsToModel(model)
      }else {
        this.model = model;
      }
    },
    // 创建过滤 过滤器
    createFilter(item, queryString) {
      // 转小写，进行字符串比较 name/value都可以进行比较过滤
      return item.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0 || 
      item.cate.toLowerCase().indexOf(queryString.toLowerCase()) === 0;
    },
    superconverter(node) {
      
    },
    tag( value, cate ) {
      return [
      `<span 
        data-type="tag" 
        class="${this.tagClass}" 
        data-cate="${cate}" 
        data-value="${value}"
        contenteditable="false" 
        >`,
        // 文本 
        `${cate}/${value}`,
      `</span>`
      ].join('');
    },
    text(value) {
      return [
        `<span 
          class="text" 
          data-type="text" 
          contenteditable="true" 
        >`,
          `${value}`,
        `</span>`
      ].join('');
    },
    // 转化为 --> html
    tagParse() {
      let html = ''
      this.model.map(item => {
          html+= (typeof item === 'string' ? this.text(item) : this.tag(item.value, item.cate));
      });
      return html;
    },
    toStrings(model) {
      model = model||this.model;
      let str = '';
      model.map((item) => {
        if(typeof item === 'string') str+=item;
        else {
          str+= ' @' + ( item.cate + '/' + item.value ) + ' ';
        }
      })
      return str;
    },
    stringsToModel(str) {
      let reg = /(\s@[^\s].*?\/.*?\s)/g;
      let tagCutReg = /\s@(.*?)\/(.*?)\s/;
      let strArr = str.split(reg);
      let model = strArr.map((str) => {
        // 匹配到脚本
        let match = null;
        if(match = str.match(tagCutReg)) {
          return {
            cate: match[1],
            value: match[2]
          }
        }
        return str;
      });
      return model;
    },
    // 转化为 --> model
    toModels() {
      let model = [];
      let childNodes = this.$refs['rich-input__inner'].childNodes;
      for( let i = 0; i<childNodes.length; i++) {
        let cnode = childNodes[i];
        // 已经被处理过了 (model存在tag标签的记号)
        if(this.model.length) {
          // br标签
          if(cnode.tagName === 'BR') model.push('<br>')
          // 文本节点
          if(cnode.nodeType === 3)
          { 
            model.push(cnode.textContent);
          }
        }
        // 遇到text标签时
        if(cnode.dataset&&cnode.dataset.type === 'text') {
          model.push(cnode.innerHTML);
        }
        // 遇到tag时
        if(cnode.dataset&&cnode.dataset.type === 'tag') {
          let cate = cnode.dataset.cate;
          let text = cnode.dataset.value;
          model.push({ cate, value: text })
        }
      }
      return model;
    },
    // 添加tag
    addTag(node, item ) {
      let reg =  /^\$.*?\$$/;
      let arrayReg =  /(\$.*?\$)/g;
      let nodeText = node.parentNode.innerHTML;
      this.model = this.toModels();
      this.$nextTick(() => {
        let textArr = nodeText.split(arrayReg);
        let matchIdx = 0;
        let newArr = [];
        textArr = textArr.map((text, index) => {
          if(!text.match(reg)) return text;
          // if(text.match(reg)) {
          //   matchIdx = index;
          //   newArr.push(item);
          //   return;
          // }
          matchIdx = index;
          return item ;
        });
        if(!this.model[this.model.length-1]) textArr.push('<br>');
        this.model.splice(this.nodeIndex, 1, ...textArr);
        this.$nextTick(() => {
          this.renderString = this.toStrings(this.toModels());
        })
      })
    },
    // 第几个node
    eq(node) {
      let index = 0;
      let childNodes = node.parentNode.childNodes;
      for(let i = 0; i< childNodes.length; i++) {
        let cnode = childNodes[i];
        if(cnode === node) {
          index = i;
          break;
        }
      }
      return index;
    },
    removeOr(node) {
      // 如果是文本节点 则取
      node = node.nodeType === 3 ? node.parentNode: node;
      node = node.previousSibling;
      if(!node) return;
      if(node.dataset.type !== 'text') {
        // tag标签就将其移除
        node.remove();
      }else {
        let textNode = node.childNodes[0];
        if(!textNode) {
          this.removeOr(node);
          return;
        }
        let last = textNode.textContent.length-1;
        // 更新标签
        setTimeout(() => {
          let r = rangeSet(textNode, last, last)
          let selection = window.getSelection()
          selection.removeAllRanges()
          // 插入新的光标对象
          selection.addRange(r)
        });
        
      }
    },
    change(e) {
      let data = e.data;
      let r = range();
      this.node = r.commonAncestorContainer;
      let span = r.commonAncestorContainer.parentNode;
      span = span.dataset.type ? span: r.commonAncestorContainer;
      this.nodeIndex = this.eq(span);
      this.cusorPos = r.startOffset;
      if(data === '$') {
        !this.isShow&&( this.identPos =  r.startOffset)
        this.isShow = true;
      }
      this.$nextTick(() => {
        // 实时转化
        this.renderString = this.toStrings(this.toModels());
      })
    },
    down(e) {
      // 获取range对象
      let r = range();
      // enter键
      // if(e.key === 'Enter') {
      //   e.preventDefault();
      // }
      // 返回键
      if(e.key === 'Backspace'&&r.startOffset === 0) {
        // this.model.length&&this.removeOr(e.target);
      }
      // 安全措施 当已经删除光了 标签没有数据，，将rich-input__inner变成可编辑
      if(e.key === 'Backspace') {
        let inner = this.$refs['rich-input__inner'];
        setTimeout(() => {
          if(!inner.innerText) this.model = [];
        })
      }
    },
    click() {
    },
    select(item) {
      this.node.textContent = spliceInString(this.node.textContent, this.cusorPos, '$');
      this.addTag(this.node, item);
      this.isShow = false;
      
    },
  },
  
}
</script>

<style scoped lang="stylus">
  .rich-input 
    width: 240px;
    margin: 30px auto;
    font-size: 16px!important;
    position: relative;
  .rich-input .complete-down 
    position: absolute;
    z-index: 1001;
    border: 1px solid #e4e7ed;
    border-radius: 4px;
    background-color: #fff;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    box-sizing: border-box;
    margin: 5px 0;
    min-width 244px
    bottom 0
    left 50%
    transform translate3d(-50%, 102%, 0)
    max-height 280px
    overflow auto
  .rich-input__inner 
    text-align: left;
    -webkit-appearance: none;
    background-color: #fff;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    outline: none;
    padding: 6px 15px;
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    width: 100%;

</style>
<style lang="stylus">
  .rich-input__inner
    span 
      outline none
    .tag 
      box-sizing: border-box;
      border-color: transparent;
      margin: 2px 2px 2px 2px;
      background-color #f0f2f5;
      height 24px
      line-height 22px
      display: inline-block;
      font-size 12px 
      border 1px solid rgba(64,158,255,.2)
      border-radius 4px
      padding 0 8px
</style>

