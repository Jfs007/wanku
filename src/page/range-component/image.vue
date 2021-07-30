<template>
  <span :key="item.guid" :data-comments="item.comments" style="width: 100%">
    <img :src="item.text" style="width: 100%" />
  </span>
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
  },
};
</script>