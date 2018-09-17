<template lang="pug">
  div.binary-tree-node
    div
      div.binary-tree-node__parent-node( @click="nodeClick")
        div.binary-tree-node__content
          span.node-operation
            span.node-operation__icon.el-icon-circle-plus( @click="addClick", v-if="!tree_node.children.length")
            span.node-operation__icon.el-icon-edit( @click="editClick" )
          div 条件 {{tree_node.name}} 
          div 脚本 {{tree_node.value}}
        
      div.binary-tree-node__connect(v-if="tree_node.children.length" ) 
        div.binary-tree-node__connect-bg( 
          :class="[ tree_node.children.length=== 1 ? 'binary-tree-node__connect_one ': 'binary-tree-node__connect_two' ]"
        )
      div.binary-tree-node__children-node( 
        v-if="tree_node.children.length")
        binary-tree-node.children-node( 
          :index="index",
          :class="{'children-node_two': tree_node.children.length === 1 }"
          :tree_node="node", 
          :key="node.id",
          v-for= '(node, index) in tree_node.children')
       
</template>

<script>
import binaryTreeNode from '@/components/binary_tree_node'
export default {
  // component
  name: 'binaryTreeNode',
  components: {binaryTreeNode},
  inject: ['root'],
  data() {
    return {
      nodeWidth: {
        // width
      }
    }
  },
  props: {
    tree_node: {
      type: Object
    },
    index: {
      type: Number
    }
  },
  methods: {
    nodeClick() {
      // this.root.removeNode(this.tree_node, this.index)
      this.root.$emit('nodeClick', { node: this.tree_node })
    },
    addClick() {
      this.root.$emit('addClick', { node: this.tree_node })
    },
   
    editClick() {
      this.root.$emit('editClick', { node: this.tree_node })
    }
  },
  beforeCreate() {

  },
}
</script>
<style lang="stylus" scoped>
  .binary-tree-node
    font-size 16px
    box-sizing border-box
    display block
    .binary-tree-node__parent-node
      box-sizing border-box
      width 100%
      text-align center 
      border 1px solid #c9c9c9 
    .binary-tree-node__content 
      padding 12px
      position relative
      .node-operation
        position absolute 
        right 10px 
        top 8px
        .node-operation__icon  
          cursor pointer
          margin-right 10px
    .binary-tree-node__connect 
      // flex 2
      height 50px 
      width 100%
    .binary-tree-node__connect-bg 
      height 100%  
      &.binary-tree-node__connect_one 
        position relative
        &:after 
          content " "
          position absolute
          left 50%
          top 0
          transform translateX(-50%)
          width 1px 
          height 100%
          background-color #c9c9c9 
      &.binary-tree-node__connect_two
        overflow hidden
        position relative
        &:after 
          content " "
          position absolute
          left 50%
          top 0
          transform translateX(-50%)
          width 1px 
          height 50%
          background-color #c9c9c9 
        &:before 
          content " "
          position absolute 
          width 50% 
          height 100% 
          left 0
          top -2px
          border-radius 50px
          border 1px solid #c9c9c9 
          transform translate3d(50%, 50%, 0)
    .binary-tree-node__children-node 
      width 100%
      display flex 
      .children-node 
        // flex 1
        width 50%
        &.children-node_two
        // float left
          width 100% 




</style>


