<style scoped>
.comment-warp.active {
  /* transform: scale3d(110%, 110%, 100%); */
}
</style>
<template>
<!--  transform: 'translateY(' + offsetTop + 'px)', -->
  <div
    class="p-comment"
    :style="{
      top: item.top + 'px',
    }"
  >
  <!-- {{root.ctx.select_comment_id}} -->
    <!-- <span class="comment-num" v-if="item.comments.length">
      {{ item.comments.length }}</span
    > -->
    <div
      :class="['comment-warp', comment.id == root.ctx.select_comment_id ? 'active' : '']"
      v-for="comment in item.comments"
     
      @click="root.selectComment({ id: comment.id })"
    >
      <div class="comment-warp__body">
        <comment-unit v-for="unit in comment.unit" :item="unit"></comment-unit>
      </div>
    </div>
  </div>
</template>
<script>
import { getComputedStyle } from "../range-core/lib/dom";
import commentUnit from "./comment-unit@2v.vue";
export default {
  components: {
    commentUnit,
  },
  inject: ["root"],
  props: {
    item: {
      default() {
        return {
          comments: [],
        };
      },
    },
    index: {
      default: 0,
    },
    h_list: {
      default() {
        return [];
      },
    },
  },
  created() {
    this.getHeight();
  },
  computed: {
    offsetTop() {
      // let padding = this.index > 0 ? 12 : 0;
      // let all_h = 0;
      // for (let i = 0; i < this.index; i++) {
      //   let h = this.h_list[i] || 0;
      //   all_h = all_h + h + padding;
      // }

      // //   console.log(this.item.top <= all_h)
      // if (this.item.top <= all_h) {
      //   return all_h - this.item.top;
      // }
      // return all_h;
    },
  },
  watch: {
    item() {
      this.getHeight();
    },
  },
  methods: {
    getHeight() {
      // this.$nextTick(() => {
      //   let h = getComputedStyle(this.$el).height;
      //   this.$emit("get-h", parseInt(h), this.index);
      // });
    },
  },
};
</script>