<template>
  <div class="comment">
    <span
      class="comment-add-btn"
      v-if="comment_pos.start_pos"
      @click="toAddComments"
      :style="{ top: comment_pos.top + 'px' }"
    ></span>
    <template v-for="(item, index) in comments">
      <div
        v-if="ctx.select_comment_id == item.id"
        class="p-comment"
        :style="{
          top: item.top + 'px',
        }"
      >
        <div class="comment-warp">
          <div class="comment-warp__body">
            <comment-unit v-for="(unit, index) in item.unit" :item="unit" :key="index"></comment-unit>
          </div>
        </div>
      </div>
    </template>
    <!-- {{comment_pos.start_pos}} -->
    <!-- <template  v-for="(item, index) in comments">
      <comment-unit
      @select-comment="selectComment"
      :h_list="h_list"
      @confirm-comments="confirmComments"
      data-index="index"
      v-if="index == (comment_pos.start_pos&&comment_pos.start_pos[0])"
      :item="item"
      ref="comment-unit"
      :index="index"
      @get-h="setHeightList"
    ></comment-unit>

    </template> -->
  </div>
</template>
<script>
import commentUnit from "./comment-unit@2v.vue";
export default {
  provide() {
    return {
      root: this,
    };
  },
  components: { commentUnit },
  props: {
    comments: {
      default() {
        return [];
      },
    },
    comment_pos: {
      default() {
        return {};
      },
    },
    ctx: {
      default() {
        return {};
      },
    },
  },
  computed: {
    comment_add_top() {
      //    console.log(this.comment_pos.start_pos);
      let pos = this.comment_pos.start_pos && this.comment_pos.start_pos[0];
      if (pos) {
        return this.comments[pos] && this.comments[pos].top;
      }
    },
  },
  data() {
    return {
      h_list: [],
    };
  },
  methods: {
    addCommentTemplate(item) {
      this.$emit("add-comment-template", item);
    },
    confirmComments(text, comment) {
      this.$emit("confirm-comments", text, comment);
    },
    toAddComments() {
      this.$emit("add-comments");
    },
    setHeightList(h, idx) {
      this.h_list[idx] = h;
      this.h_list = [].concat([], this.h_list);
    },
    redraw() {
      let pos = this.comment_pos.start_pos && this.comment_pos.start_pos[0];
      if (pos != undefined) {
        // this.
        this.$refs["comment-unit"][pos].getHeight();
      }
    },
    selectComment(comment) {
      this.$emit("select-comment", comment);
    },
  },
};
</script>
<style >
.comment {
  position: absolute;
  right: 40px;
  top: 80px;
}
.comment .comment-add-btn {
  right: 4px;
  position: absolute;
  width: 30px;
  height: 27px;
  text-align: center;
  background-size: 30px 27px;
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA2BAMAAABpSecnAAAAGFBMVEUAAACrq6uhoqago6WlqKjMzMygo6WgoqWYdQImAAAAB3RSTlMADsneHwXEu+TZiQAAAFhJREFUOMtjGAWDFbCXo4ACEqULUHh0loZSg1QaEmIEpAelyxHUoIpvUHiVspjjS6mlzigpFV1JibkivqxQXCSAN6co4s1IRQJ4pfFqZmATwCvNyDAKqAIA8wc7AmaX4JkAAAAASUVORK5CYII=);
}
.comment .p-comment {
  position: absolute;
  left: 0;
  font-size: 16px;
}
.comment .comment-num {
  position: absolute;
  top: 0;
  left: 0;
  background: #a0a2a5;
  color: #fff;
  padding: 2px 4px;
  font-size: 12px;
}
.comment .comment-warp {
  width: 260px;
  background: #fff;
  box-shadow: 0 1px 3px rgb(0 0 0 / 15%);
  border-radius: 2px;
  cursor: pointer;
}
.comment .comment-warp .comment-warp__body {
  padding: 12px 15px;
}
</style>