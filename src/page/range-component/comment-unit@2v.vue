
<style scoped >
.comment-unit--wrap {
  padding: 12px 0;
  position: relative;
}
.comment-unit--wrap .comment-unit-wrap__content {
  outline: none;
  z-index: 1;
  display: block;
  position: relative;

  min-height: 20px;
  line-height: 20px;
  word-break: break-word;
  border: none;
  outline: none;
  resize: none;
  font-size: 12px;
  color: #555;
  text-align: left;
  padding: 5px 0;

  /* border-bottom: 1px solid #ccc; */
}
.comment-unit--wrap .comment-unit-wrap__input {
  position: relative;
}

.comment-unit--wrap .comment-unit-wrap__info {

}

.comment-unit--wrap .comment-unit--placeholder {
  position: absolute;
  z-index: 0;
  height: 20px;
  line-height: 20px;
  color: #cdcdcd;
  left: 0;
  top: 5px;
  font-size: 12px;
}

.comment-unit--wrap .comment-unit--operation {
  text-align: right;
}
.comment-unit--wrap .comment-unit--operation .btn {
  display: inline-block;
  height: 26px;
  line-height: 24px;
  font-size: 12px;
  font-weight: normal;
  min-width: 48px;
  padding: 0 12px;
  box-sizing: border-box;
  border-radius: 2px;
  border-width: 1px;
  border-style: solid;
  text-align: center;
  cursor: pointer;
  transition: opacity 0.3s, border-color 0.3s;
  text-decoration: none;
  background-color: #fff;
  outline: none;
}
.comment-unit--wrap .comment-unit--operation .confirm-btn {
  color: #fff;
  border-color: #41464b;
  background-image: linear-gradient(#41464b, #2c3033);
}
.comment-unit--wrap .comment-unit--operation .cancel-btn {
  margin-left: 10px;
  color: #676b6f;
  border-color: #ccc;
  background-image: linear-gradient(#fff, #fbfbfb);
}
</style>
<template>
  <div class="comment-unit--wrap" >
    <div class="comment-unit-wrap__info">

    </div>
    <div class="comment-unit-wrap__input" @click="addCommentTemplate">
      <span class="comment-unit--placeholder" v-if="!is_edit && item.is_new">
        按enter发送，shift+enter换行
      </span>
      <!--  @blur="(e) => root.confirmComments(e, item)" -->
      <div
        class="comment-unit-wrap__content"
        :contenteditable="item.is_new"
        @input="changeComment"
        ref="input"
      >
        {{ item.text }}
      </div>
    </div>
    <div class="comment-unit--operation" v-if="item.is_new">
      <button class="btn confirm-btn" @click="confirmComment">确定</button>
      <button class="btn cancel-btn">取消</button>
    </div>
  </div>
</template>
<script>
export default {
  inject: ["root"],
  props: {
    item: {
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      is_edit: false,
    };
  },
  methods: {
    confirmComment() {
      let value = this.$refs["input"].outerText;
      console.log('sdfasf', value)
      this.root.confirmComments(value, this.item);
    },
    changeComment(e) {
      //   console.log(e, 'value')
      this.is_edit = e.target.outerText != "";
    },
    addCommentTemplate(e) {
      if (this.item.is_new) return;
      this.root.addCommentTemplate(this.item);
    },
  },
};
</script>