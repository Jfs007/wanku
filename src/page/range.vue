<style scoped>
.frame {
  /* user-select: none; */
}
@keyframes cursor {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
.cursor {
  opacity: 1;
  position: fixed;
  /* background: gold; */
  width: 30px;
  height: 30px;
  /* animation: cursor 1.3s infinite; */
  /* animation-fill-mode: forwards; */
}
.commented {
  border-bottom: 2px solid #f8e1a1 !important;
}
.commented-background {
  background-color: #f8e1a1 !important;
}
.jf-editor-content {
  margin: 20px auto;
  /* background: #fff; */
  box-shadow: 0 1px 5px #ddd;
  padding: 80px 80px;
  border: 1px solid #ddd;
  width: 800px;
}
.jf-editor {
  font-size: 16px;
  text-align: left;
}
.jf-editor ::selection {
  background-color: rgba(109, 160, 227, 0.3);
}
.jf-editor__paragragh {
  font-size: 0;
}
.jf-editor__paragragh .jf-unit {
  font-size: 16px;
}
</style>
<template>
  <div class="jf-editor-content">
    <div   style="position: fixed;z-index: -1;top:0;font-size: 12px;">
      <div 
   
    v-for="item in comments">{{item.id}}</div>
    </div>
    
    <img 
    :src="pizhu"
    class="cursor" :style="cursor._style" v-if="cursor.index > -1"></img>
    <div class="jf-editor" ref="editor">
      <div
        class="jf-editor__paragragh"
        v-for="(spans, index) in Paragraghs.paragragh"
      
      > 
      <template  v-for="(item, idx) in Paragraghs.spans[index]" >
        <component :is="cI(item)" :ctx="Paragraghs" :item="item"
        :data-comments="item.comments"
          :data-spans-index="index"
          :data-index="idx"
          @select-comment="selectComment([index, idx])"
        ></component>
        <!-- <template v-if="item.type == 'text'"> -->
          <!-- <span
            :key="item.guid"
          v-if="item.type == 'text'"
          :class="['jf-unit', item.comments.length ? 'commented' : '', item.comments.find(_ => _ == Paragraghs.select_comment_id) ? 'commented-background' : '']"
          :data-comments="item.comments"
          :data-spans-index="index"
          :data-index="idx"
          @click="selectComment([index, idx])"
          >{{ item.text }}</span
        >
          <span 
          :key="item.guid"
          :data-comments="item.comments"
          :data-spans-index="index"
          :data-index="idx"
          style="width: 100%" v-if="item.type == 'img'">
             <img :src="item.text" style="width: 100%"/>
          </span> -->
      </template>
       
      </div>
    </div>

    <div ref="render"></div>
  </div>
</template>
<script>
import rangeCore from "./range-core";
import { getTextNode, getComputedStyle } from "./range-core/lib/dom";
import { getRange, emptyRange } from "./range-core/lib/index.js";
import { computedRangeBoundary } from "./range-core/lib/computed";
import Register from "./range-core/register";
import { parse } from "./range-core/lib/parse";
import textUnit from "./range-core/component/text-unit";
import Paragraph from "./range-core/component/paragraph";
import Comment from "./range-core/component/comment";
import pizhu from "./pizhu.png";
import RangeImage from "./range-component/image.vue";
import RangeText from "./range-component/text.vue";

export default {
  data() {
    return {
      comments: [],
      pizhu,
      cursor: {
        _style: {},
      },
      render: [],
      Paragraghs: new Paragraph([
        new textUnit({
          text: "1😊🌟❤️撒娇款短发就是快点放假啊阿斯顿发顺丰克里斯朵夫将阿克索德放假啊可是大家发就是短发加上地方3456",
        }),
        new textUnit({ text: "abcd" }),
        new textUnit({ text: "\n" }),
        new textUnit({ text: "123456789" }),
        new textUnit({ text: "\n" }),
        new textUnit({ text: "HIJKLMN" }),
        new textUnit({ text: "\n" }),
        new textUnit({
          text: "http://tmkoc.oss-cn-shanghai.aliyuncs.com/image/2021-07-28/47abd076919b480a85a17bd7170a2985.jpeg",
          type: "image",
        }),
        new textUnit({ text: "\n" }),
      ]),
    };
  },
  mounted() {
    this.getTextNode();
    document.addEventListener("click", this.bindClick);
    let events = Register(this.$refs.editor);
    events.on("range-select", this.bindSelect);
  },
  components: {},
  methods: {
    cI(item) {
      let components = { text: RangeText, image: RangeImage };
      console.log(item.type, "type");
      return components[item.type];
    },
    selectComment(pos) {
      this.Paragraghs.selectComment(pos);
    },
    getTextNode() {
      //   this.addRange(range);
    },
    addRange(range) {
      const selection = window.getSelection();

      // 添加光标选择的范围
      selection.addRange(range);
    },
    bindClick(e) {
      let textNode = getTextNode(e.target);
      if (textNode) {
        let boundary = computedRangeBoundary(
          {
            x: e.clientX,
            y: e.clientY,
          },
          textNode
        );
        this.setCursor(boundary);
      }
    },
    hasExitComment(textRange, id) {
      if (id) return this.comments.filter((_) => _.id == id);
      return this.comments.filter(
        (_) => _.textRange[0] == textRange[0] && _.textRange[1] == textRange[1]
      );
    },
    bindSelect(rect) {
      let { startNode, endNode, startOffset, endOffset } = rect;
      // console.log(startNode, endNode, startOffset ,endOffset)
      let start_pos = [
        startNode.dataset["spansIndex"],
        startNode.dataset.index,
      ];
      let end_pos = [endNode.dataset["spansIndex"], endNode.dataset.index];
      let textRange = this.Paragraghs.getTextRange(
        start_pos,
        end_pos,
        startOffset,
        endOffset
      );
      // console.log(textRange)
      if (!this.hasExitComment(textRange).length) {
        let id = "commit-" + Date.now();
        this.comments.push(
          new Comment({
            textRange,
            text: id,
            id,
          })
        );
        this.Paragraghs.splitUnit(
          [
            [startOffset, start_pos],
            [endOffset, end_pos],
          ],
          id
        );
      }

      // let range = getRange();
      emptyRange();

      // console.log(this.Paragraghs.spans);
    },
    foundComment(pos, pos1) {
      // if(pos1[0] == pos1[0] && pos[1] == pos1[0]) {

      // }

      let prev = this.Paragraghs.getPrevUnit(pos);
      let start = this.Paragraghs.spans[pos[0]][pos[1]];
      let next = this.Paragraghs.getNextUnit(pos1);
      let end = this.Paragraghs.spans[pos1[0]][pos1[1]];
      let startsame = this.Paragraghs.commentDiff(start.comments, end.comments);
      if (startsame) {
        if (
          !this.Paragraghs.commentDiff(startsame, prev && prev.comments) &&
          !this.Paragraghs.commentDiff(startsame, next && next.comments)
        ) {
          return startsame;
        }
        return false;
      }
      return false;
    },

    setCursor(boundary) {
      if (!boundary.range) return;
      let { x, y, height } = boundary.rect;
      let scrollTop = document.body.scrollTop || 0;
      let scrollLeft = document.body.scrollLeft || 0;
      this.cursor = {
        index: boundary.index,
        _style: {
          left: x + scrollLeft + "px",
          top: y + scrollTop - 4 + "px",
          height: height / 2 + "px",
          width: height / 2 + "px",
        },
      };
    },
  },
};
</script>