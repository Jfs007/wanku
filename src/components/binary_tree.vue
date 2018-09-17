<template lang="pug">
  div.binary-tree( :style="{width: width+ 'px'}" ) 
    binary-tree-node( :tree_node="treeNode" )
      
</template>
<script>
import binaryNode from './binary_tree.js';
import binaryTreeNode from '@/components/binary_tree_node'
export default {
  components: { binaryTreeNode },
  // 向子组件注入根节点
  provide() {
    return {
      root: this
    }
  },
  props: {
    nodeData: {
      type: Object
    },
    width: {
      type: String
    }
  },
  data() {
    return {
      treeNode: {}
    }
  },
  created() {
    this.treeNode = new binaryNode(this.nodeData);
  },
  watch: {
    nodeData() {
      this.treeNode = new binaryNode(this.nodeData);
    }
  },
  methods: {
    addNode(node, addNode = {}) {
      if(node.children&&node.children.children||node.children.length>1) {
        return;
      }
      node.insertNode(addNode);
      // con
      // console.log(this.treeNode, 'treeNode');
      // this.treeNode = Object.assign({}, this.treeNode);
    },
    removeNode(node, index) {
      node.removeNode(node, index)
    },
    editNode(node, editNode ={}) {
      node.editNode(node, editNode);
      // this.treeNode = Object.assign({}, this.treeNode);
    }
  }

}
</script>

