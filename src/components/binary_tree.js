let id = 0;
// node处理函数，，，自动将传入的node数据转化出路径
export default class binaryNode {
  constructor(nodeData) {
    this.level = 0;
    this.id = ++id;
    this.index = 0;
    // this.path = 
    // this.children = [];
    for( let key in nodeData ) {
      this[key] = nodeData[key];
    }
    if(!this.children) {
      this.children = [];
    }
    if(this.parent) {
      this.level = this.parent.level+1;
    };
    this.nodeDataify(nodeData);
  }
  nodeDataify(nodes) {
    let children = nodes.children;
    if(children) {
      // 清空node
      this.children = [];
      children.map((node, index) => {
        this.insertNode(node, index)
      })
    }
  }
  insertNode(node, index) {
    index = index === undefined ? this.children.length : index;
    let binary_Node = new binaryNode(Object.assign(node, { parent: this, index }));
    this.children.push(binary_Node);
    return this;
  }
  removeNode(node, index) {
    if(!node.parent) return;
    node.parent.children.splice(index, 1);
  }
  editNode(node, editNode) {
    node.name = editNode.name;
    node.value = editNode.value;
  }
  
}