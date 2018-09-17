<template lang="pug">
  .wrapper( ref="infinityScroll")
    .content
      template( v-once ) 
        .item( ref="item" )
        .tombstone( ref="tombstone" )
</template>
<script>
import BScroll from 'better-scroll'
let scroll = null;
let baseNum = 0;
let integer = number => ~~number;
let loadData = (count) => {
  let mockData = [
    { name: '小丁' },
    { name: '中丁' },
    { name: '大丁' },
    { name: '大大丁' },
  ]
  return new Promise(resolve => {
    setTimeout(() => {
      let items = new Array(count).fill(0).map(_ => {
          let item = Object.assign( {}, mockData[ integer(Math.random()*4) ] );
          item.id = ++baseNum;
          return Object.assign( item )
      });
      resolve(
        items
      )
    }, integer(Math.random()*800+300));
  })
}
/**
 * context vm
 */
function Option() {
  return {
    
    mouseWheel: {
      speed: 20,
      invert: false,
      easeTime: 300
    },
    pullDownRefresh: {
      threshold: 50,
      stop: 20
    },
    infinity: {
      fetch(count) {
        console.log("count: ==", count)
        // count = Math.max(count, )
        return loadData(count)
      },
      render: (item, div) => {
        div = div || this.$refs['item'].cloneNode(true);
        div.innerHTML = item.id + '  ' + item.name || '未命名';
        return div;
        // 渲染每一个元素节点，item 是数据，div 是包裹元素节点的容器。
        // 该函数需要返回渲染后的 DOM 节点。
      },
      createTombstone: () => {
        return this.$refs['tombstone'].cloneNode(true);
        // 返回一个墓碑 DOM 节点。
      }
    },


  }
}
export default {
  name: 'infinityScroll',
  mounted() {
    this.init();
  },
  beforeDestroy() {
    // scroll
  },
  methods: {
    init() {
      let wrapper = this.$refs['infinityScroll']
      scroll = new BScroll(wrapper, Option.call(this));
      this.ebind(scroll)
    },
    ebind(scroll) {
      scroll.on('pullingDown', (e) => {
        console.log(e, 'e')
      })
    }
  }
  
}
</script>
<style lang="stylus" scoped>
  .wrapper 
    width 320px 
    height 300px 
    margin 20px auto
    margin-top 100px 
    padding 15px 12px
    border-radius 3px 
    box-shadow 1px 1px 3px #c2c2c2
    box-sizing border-box
    overflow hidden
    .content 
      height 350px
    .item 
      width 100%
      border-bottom 1px solid #ccc 
      padding 10px 12px 
      margin-bottom 4px
      font-size 14px 
      box-sizing border-box
    .tombstone 
      height 34px  
      width 100% 

      // box-sizing border-box
      // display none
</style>


