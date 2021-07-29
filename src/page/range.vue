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
  background: gold;
  width: 4px;
  animation: cursor 1.3s infinite;
  animation-fill-mode: forwards;
}
.commented {
  border-bottom: 2px solid #f8e1a1 !important;
}
.commented-background {
  background-color: #f8e1a1 !important;
}
.jf-editor ::selection {
  background-color: rgba(109, 160, 227, 0.3);
}
</style>
<template>
  <div class="frame">
    <div></div>

    1
    <div class="cursor" :style="cursor._style" v-if="cursor.index > -1"></div>
    <div class="jf-editor" ref="editor">
      <div
        class="jf-editor__paragragh"
        v-for="(spans, index) in Paragraghs.paragragh"
        :data-id="spans.guid"
      >
        <span
          :class="[item.comments.length ? 'commented' : '', item.comments.find(_ => _ == Paragraghs.select_comment_id) ? 'commented-background' : '']"
          :data-comments="item.comments"
          :data-spans-index="index"
          :data-index="idx"
          @click="selectComment([index, idx])"
          v-for="(item, idx) in Paragraghs.spans[index]"
          >{{ item.text }}</span
        >
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

export default {
  data() {
    return {
      cursor: {
        _style: {},
      },
      render: [],
      Paragraghs: new Paragraph([
        new textUnit({
          text: "12撒娇款短发就是快点放假啊阿斯顿发顺丰克里斯朵夫将阿克索德放假啊可是大家发就是短发加上地方3456",
        }),
        new textUnit({ text: "abcd" }),
        new textUnit({ text: "\n" }),
        new textUnit({ text: "123456789" }),
        new textUnit({ text: "\n" }),
        new textUnit({ text: "HIJKLMN" }),
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
  methods: {
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
    bindSelect(rect) {
      let { startNode, endNode, startOffset, endOffset } = rect;
      let start_pos = [
        startNode.dataset["spansIndex"],
        startNode.dataset.index,
      ];
      let end_pos = [endNode.dataset["spansIndex"], endNode.dataset.index];
      this.Paragraghs.splitUnit(
        [
          [startOffset, start_pos],
          [endOffset, end_pos],
        ],
        Date.now()
      );
      let range = getRange();
      emptyRange();
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
          top: y + scrollTop + "px",
          height: height + "px",
        },
      };
    },
  },
};
</script>