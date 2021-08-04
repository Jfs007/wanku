<template>
  <div 
  @click="selectImage"
  :class="['jf-unit', item.comments.length ? 'commented' : '', item.comments.find(_ => _ == ctx.select_comment_id) ? 'commented-background' : '']"
  :key="item.guid" :data-comments="item.comments" style="width: 100%">
    <img :src="item.text" style="width: 100%" />
  </div>
</template>
<script>
export default {
  props: {
    ctx: {},
    item: {
      default() {
        return {};
      },
    },
  },
  created() {
      console.log('created')
  },
  methods: {
    selectComment(item) {
      this.$emit("select-comment");
    },
    selectImage(item) {
      this.$emit('select', this.item)
    }
  },
};
</script>