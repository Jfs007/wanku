<template>
     <span
          :class="['jf-unit', item.comments.length ? 'commented' : '', item.comments.find(_ => _ == ctx.select_comment_id) ? 'commented-background' : '']"
          :data-comments="item.comments"
          @click="selectComment"
          >{{ item.text }}</span
        >
</template>
<script>
export default {
    props: {
        ctx: {

        },
        item: {
            default() {
                return {}
            }
        }
    },
    methods: {
        selectComment(item) {
            this.$emit('select-comment');
        }
    }
}
</script>