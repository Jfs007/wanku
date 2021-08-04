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
  /* border-bottom: 2px solid #ebe3cd !important; */
  background-color: rgba(199, 29, 36, 0.5) !important;
}
.commented-background {
  background-color: rgba(199, 29, 36, 0.8) !important;
}
.jf-editor-content {
  margin: 20px auto;
  /* background: #fff; */
  box-shadow: 0 1px 5px #ddd;
  padding: 80px 80px;
  border: 1px solid #ddd;
  width: 800px;
  position: relative;
}
.jf-editor {
  font-size: 16px;
  text-align: left;
}
.jf-editor ::selection {
  background-color: rgba(199, 29, 36, 0.5) !important;
}
.jf-editor__paragragh {
  font-size: 0;
  /* user-select: none; */
}
.jf-editor__paragragh * {
  /* user-select: all; */
}
.jf-editor__paragragh .jf-unit {
  font-size: 16px;
}
.jf-unit {
  position: relative;
}
</style>
<template>
  <div class="jf-editor-content" ref="content">
    <RangeComment 
    ref="range-comment"
    :ctx="Paragraghs"
    @confirm-comments="confirmComments"
    @add-comments="addComments"
    @add-comment-template="addCommentTemplate"
    @select-comment="selectCommentBycomment"
    :comments="comments_v" :comment_pos="comment_pos"></RangeComment>
   
    <!-- <div @click="getComments">获取commentsjson</div>
    <div   style="position: fixed;z-index: -1;top:0;font-size: 12px;">
      <div 
   
    v-for="item in comments">{{item.id}}</div>
    </div> -->
    
    <img 
    :src="pizhu"
    class="cursor" :style="cursor._style" v-if="cursor.index > -1"></img>
    <div class="jf-editor" ref="editor">
      <div
        class="jf-editor__paragragh"
        v-for="(spans, index) in Paragraghs.paragragh"
        ref="editor-paragragh"
      
      > 
      <template  v-for="(item, idx) in Paragraghs.spans[index]" >
        <component :is="cI(item)" :ctx="Paragraghs" :item="item"
        @select="selectImage([index, idx])"
          :data-comments="item.comments"
          :data-spans-index="index"
          :data-index="idx"
          @select-comment="selectComment([index, idx])"
        ></component>
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
import RangeComment from "./range-component/comment@2v";

let b = [
  {
    comments: [],
    text: "1😊🌟",
    type: "text",
    guid: "2edb5226-3b2b-b1b2-237b-92c367188406",
    _copy: [],
  },
  {
    comments: ["commit-1627902531470"],
    text: "❤️撒娇款短发就是快点放",
    type: "text",
    guid: "7199fee4-0c67-6fef-4e56-25fa26cb7f91",
    _copy: [],
  },
  {
    comments: ["commit-1627902531470"],
    text: "假啊阿斯顿",
    type: "text",
    guid: "6368a9f1-427f-b1df-2891-93f20df31865",
    _copy: [],
  },
  {
    comments: [],
    text: "发顺丰克里",
    type: "text",
    guid: "19d3ccc9-8fed-5614-27d2-ba4600668e2f",
    _copy: [],
  },
  {
    comments: ["commit-1627902532336"],
    text: "斯朵夫将",
    type: "text",
    guid: "a7d81cd5-fd4c-5fce-5fbf-a277b154b436",
    _copy: [],
  },
  {
    comments: ["commit-1627902532336"],
    text: "阿克索",
    type: "text",
    guid: "3c6c1557-8834-092d-9145-6f993f33af07",
    _copy: [],
  },
  {
    comments: ["commit-1627902532336"],
    text: "德放假啊可是大家发就是短发",
    type: "text",
    guid: "f48776dc-96fe-47b5-3107-4e415c89e6b4",
    _copy: [],
  },
  {
    comments: [],
    text: "加",
    type: "text",
    guid: "9fc48ac7-d3d8-b9f0-2eb7-ef99b5b3857a",
    _copy: [],
  },
  {
    comments: [],
    text: "上地方34",
    type: "text",
    guid: "9eecf605-7863-b579-7c0d-a6f900f31d73",
    _copy: [],
  },
  {
    comments: ["commit-1627902533385"],
    text: "56",
    type: "text",
    guid: "d6aae75a-fa9b-12e7-b989-1bcfe12bcb1f",
    _copy: [],
  },
  {
    comments: ["commit-1627902533385"],
    text: "abcd",
    type: "text",
    guid: "80c6b424-b810-f996-24bc-9c5303ed3f5f",
    _copy: [],
  },
  { text: "\n", type: "text" },
  {
    comments: [],
    text: "1",
    type: "text",
    guid: "c93d1894-e236-0bd3-d63f-0373805a962c",
    _copy: [],
  },
  {
    comments: ["commit-1627902534423"],
    text: "23456",
    type: "text",
    guid: "16579334-d10b-e219-93f7-94adb04ef4bf",
    _copy: [],
  },
  {
    comments: ["commit-1627902534423"],
    text: "7",
    type: "text",
    guid: "a0b8b991-56d2-d6ae-dca6-371dfcbb6de1",
    _copy: [],
  },
  {
    comments: [],
    text: "89",
    type: "text",
    guid: "78463901-8cce-ce1e-5799-c76c496a22df",
    _copy: [],
  },
  { text: "\n", type: "text" },
  {
    comments: [],
    text: "HIJ",
    type: "text",
    guid: "1587eb00-1fbd-c282-cf75-909e12e92c16",
    _copy: [],
  },
  {
    comments: ["commit-1627902535405"],
    text: "KLMN",
    type: "text",
    guid: "66e475d7-1adb-c7f0-5bd1-8e0968a2e8d5",
    _copy: [],
  },
  { text: "\n", type: "text" },
  {
    comments: [],
    text: "http://tmkoc.oss-cn-shanghai.aliyuncs.com/image/2021-07-28/47abd076919b480a85a17bd7170a2985.jpeg",
    type: "image",
    guid: "5712534a-03bf-f020-ff2d-fc9233972adb",
    _copy: [],
  },
  { text: "\n", type: "text" },
];

let c = [];
export default {
  data() {
    return {
      comments_v: [],
      comments: c,
      pizhu,
      cursor: {
        _style: {},
      },
      render: [],
      comment_pos: {},

      Paragraghs: new Paragraph(
        b.map((_) => {
          return new textUnit({
            text: _.text,
            type: _.type,
            // comments: _.comments
          });
        })
      ),
    };
  },
  mounted() {
    this.getTextNode();
    document.addEventListener("click", this.bindClick);
    let events = Register(this.$refs.editor);
    events.on("range-select", this.bindSelect);
    this.commentsComputed();
  },
  components: {
    // RangeComment
    // RangeComment,
    RangeComment,
  },

  methods: {
    getCommentId() {
      let id = "commit-" + Date.now();
      return id;
    },
    addComments() {
      let { start_pos, end_pos, startOffset, endOffset } = this.comment_pos;
      let textRange = this.Paragraghs.getTextRange(
        start_pos,
        end_pos,
        startOffset,
        endOffset
      );
      let exitcomment = this.hasExitComment(textRange);
      // console.log(exitcomment, 'ex')
      if (!exitcomment.length) {
        let pos = start_pos[0];
        let id = this.getCommentId();
        this.comments_v.push({
          id,
          top: this.comment_pos.top,
          index: pos,
          unit: [
            new Comment({
              textRange,
              text: "",
              id,
              is_new: true,
            }),
          ],
        });
        this.Paragraghs.select_comment_id = id;
        // console.log(this.comments_v)
      } else {
        this.Paragraghs.select_comment_id = exitcomment[0].id;
        let comments = this.comments_v.find((_) => _.id == exitcomment[0].id);
        // let id = this.getCommentId();
        comments.unit.push(
          new Comment({
            textRange,
            text: "",
            id: exitcomment[0].id,
            is_new: true,
          })
        );
        // console.log(exitcomment, "exitcomment");
      }
    },
    addCommentTemplate(item) {
      //  let { start_pos, end_pos, startOffset, endOffset } = this.comment_pos;

      let comment = this.comments_v.find((_) => _.id == item.id);
      //  console.log(item, 'item', this.comments_v)
      let is_new = comment.unit.find((_) => _.is_new);
      if (!is_new) {
        comment.unit.push(
          new Comment({
            textRange: item.textRange,
            text: "",
            id: item.id,
            is_new: true,
          })
        );
      }
    },
    selectImage(item) {
      this.comment_pos = {
        start_pos: item,
        end_pos: item,
        startOffset: 0,
        endOffset: 0,
      };
    },
    confirmComments(text, comment) {
      console.log(comment, "comment", text);
      let { start_pos, end_pos, startOffset, endOffset } = this.comment_pos;
      if (!this.Paragraghs.select_comment_id) return;

      comment.is_new = undefined;
      comment.text = text;
      if (start_pos) {
        this.Paragraghs.splitUnit(
          [
            [startOffset, start_pos],
            [endOffset, end_pos],
          ],
          comment.id
        );
      }

      this.comment_pos = {};
      this.Paragraghs.select_comment_id = undefined;
      emptyRange();
      // this.h_list =
    },
    getComments() {
      let comments = this.comments.map((_) => {
        return {
          id: _.id,
          text: _.text,
        };
      });
      console.log(JSON.stringify(this.Paragraghs.getJSON()));
      console.log(JSON.stringify(comments));
    },
    selectCommentBycomment(comment) {
      this.Paragraghs.select_comment_id = comment.id;
    },
    commentsComputed() {
      return;
      let comments = this.Paragraghs.computedComments(c);
      // console.log(comments, 'comments');
      let contentrect = this.$refs["content"].getBoundingClientRect();

      let paragraghs = this.$refs["editor-paragragh"];

      paragraghs.map((p, index) => {
        let { top } = p.getBoundingClientRect();
        //  console.log(top, 'top');
        if (comments[index]) {
          comments[index].top = top - contentrect.top - 80;
        }
      });
      this.comments_v = comments;
      // console.log(comments, "comments");
    },

    getParagraghsRect(index) {
      let contentrect = this.$refs["content"].getBoundingClientRect();
      let dom = this.$refs["editor-paragragh"][index];
      if (dom) {
        return dom.getBoundingClientRect().top - contentrect.top - 80;
      }
    },

    cI(item) {
      let components = { text: RangeText, image: RangeImage };
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
      let range = getRange();
      // console.log(range)
      // this.comment_pos = {};
      // let textNode = getTextNode(e.target);
      // if (textNode) {
      //   let boundary = computedRangeBoundary(
      //     {
      //       x: e.clientX,
      //       y: e.clientY,
      //     },
      //     textNode
      //   );
      //   this.setCursor(boundary);
      // }
    },
    hasExitComment(textRange, id) {
      // this.comments_v.map((_) => {
      //   // let comments = _.comments;
      // });
      if (id) return this.comments_v.filter((_) => _.id == id);

      return this.comments_v.filter((comment) => {
        let unit = comment.unit && comment.unit[0];
        if (unit)
          return (
            unit.textRange[0] == textRange[0] &&
            unit.textRange[1] == textRange[1]
          );
        return false;
      });
      // (_) => _.textRange[0] == textRange[0] && _.textRange[1] == textRange[1]
      // );
    },
    bindSelect(rect) {
      let { startNode, endNode, startOffset, endOffset } = rect;
      if (!startNode) {
        this.comment_pos = {};
        this.Paragraghs.select_comment_id = undefined;
        return;
      }
      let start_pos = [
        startNode.dataset["spansIndex"],
        startNode.dataset.index,
      ];
      let end_pos = [endNode.dataset["spansIndex"], endNode.dataset.index];

      this.comment_pos = {
        start_pos,
        end_pos,
        startOffset,
        endOffset,
        top: this.getParagraghsRect(start_pos[0]),
      };
      return;
    },

    viewComments() {
      let { start_pos } = this.comment_pos;
      // start_pos[0]
    },

    foundComment(pos, pos1) {
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