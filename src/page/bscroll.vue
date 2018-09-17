<template lang="pug">
  .bscroll-demo
    .bscroll-demo__header
    .bscroll-demo__wrapper( ref="scroll") 
      .bscroll-demo__content 
        ul.chat-room 
          li.chat-room__msg-box( v-for="(item, index) in data", :class="['chat-room__msg-box'+index]")
            span {{item}} - {{index}}
      .chat-record_num( v-show="showUnRead", @click="scrollToBt")
        span {{num}}
      .chat-record_paster 
        span {{num}} 条 

    .bscroll-demo__footer
</template>

<script>
/**
 * 
 * 未读的消息 -> 读完消息才算 移除 
 * 
 * 
 *
 * 新来的 消息 ++
 * 
 * 
 * 
 */
import BScroll from 'better-scroll'
import {dateFormat} from '@/js/misc'

export default {
  name: 'HelloWorld',
  data () {
    return {
      scroll: null,
      data: new Array(36).fill(1).map((item, idx) => dateFormat(new Date(), 'hh:mm:ss')+ idx),
      flag: false,
      maxScrollY: 0,
      timer: null,
      num: 30,
      inRoom: false
    }
  },
  computed: {
    showUnRead() {
      if(!this.scroll) return false;
      return (this.scroll.y> this.maxScrollY+20)&&this.num >0
    }
  },
  mounted() {
    let scroll = new BScroll(this.$refs['scroll'], 
      {
        scrollY: true,
        pullUpLoad: true,
        pullDownRefresh: {
          threshold: 10
        },
        pullUpLoad: {
          threshold: 10
        },
        click: true,
        scrollbar: {
          fade: true,
          interactive: false // 1.8.0 新增
        }
        // click: true,
        // startY: 300
      }
    );
    scroll.scrollTo(0, scroll.maxScrollY, 250)
    scroll.on('pullingDown', () => {
      let maxScrollY = scroll.maxScrollY;
      this.data.unshift(...new Array(6).fill(1).map((item, idx) => dateFormat(new Date(), 'hh:mm:ss')+ idx));
      this.$nextTick(() => {
        scroll.finishPullDown();
        scroll.refresh();
        let currMaxScrollY = scroll.maxScrollY;
        scroll.scrollTo(0, (currMaxScrollY- maxScrollY) >= 0 ? currMaxScrollY: (currMaxScrollY- maxScrollY))
      })
    });
    scroll.on('scroll', ({x, y}) => {
      if(y<=(scroll.maxScrollY+20)&&this.inRoom) {
        this.num = 0;
      }
    });
    scroll.on('scrollEnd', () => {
      if(!this.inRoom) this.inRoom = true;
    })
    this.scroll = scroll;
    this.addMsg();

  },
  methods: {
    click(e) {
      console.log(e)
    },
    addMsg() {
      this.timer = setInterval(() => {
        if(this.data.length> 190) { clearInterval(this.timer); this.timer = null; return;};
        this.data.push(dateFormat(new Date(), 'hh:mm:ss')+ this.data.length);
        this.$nextTick(() => {
          this.scroll.refresh();
          if(this.scroll.y<=this.scroll.maxScrollY+80) {
            this.scroll.scrollTo(0, this.scroll.maxScrollY, 120);
          }else {
            this.num++;
          }
          this.maxScrollY = this.scroll.maxScrollY;
        })
        
        // this.
        // this.num++;
      }, 1200);

    },
    scrollToBt() {
      this.num = 0;
      
      // clearInterval(this.timer); this.timer = null;
      this.scroll.scrollTo(0, this.maxScrollY, 250);
      // setTimeout(() => {
      //   this.addMsg();
      // }, 6000);
    }

  }
}
</script>


<style lang="stylus" scoped>
.bscroll-demo 
  margin 0px auto;
  height 100vh
.bscroll-demo__header 
  height 60px
.bscroll-demo__wrapper 
  overflow hidden
  height calc(100vh - 60px- 55px)  
  background #c9c9c9 
  color #fff 
  text-align center
  position relative
  .chat-record_num 
    width 22px 
    height 22px 
    line-height 22px
    text-align center
    font-size 15px
    border-radius 50% 
    background: rgba(0, 0, 0, .7)
    position absolute
    color #ffffff 
    bottom 6px 
    right 24px
    z-index 9880
  .chat-record_paster  
    position absolute
    background-color #ffffff
    color rgb(104, 182, 243)
    padding 8px 0
    text-align center
    width 80px 
    top 8px 
    right 0px
    border-radius 20px 0 0 20px
    font-size 15px
  .bscroll-demo__content 
    min-height 100vh 
    border-bottom 4px solid rgb(189, 231, 171)
    box-sizing border-box 
.bscroll-demo__footer 
  height 55px    
.bscroll-demo
  .chat-room 
    background-color: #c9c9c9 
    padding 0;
    margin 0;
    padding 12px 0 
    border-bottom 4px solid green;
    padding-bottom 40px
    .chat-room__msg-box 
      margin 0 12px
      padding 0;
      border-radius 3px 
      padding 8px 10px
      margin-bottom 10px
      list-style none
      background-color green;
      

</style>

