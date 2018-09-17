<template lang="pug">
div.binary-tree-demo
  el-dialog( :visible.sync="dialogVisible", width="700px", :title="isEdit? '编辑': '添加'", @close="close" )
    div 
      el-row( :gutter="20", v-if="!isEdit" ) 
        el-col( :span="12", v-for="formData in form", :key="formData")
          el-form( :model='formData' )
            el-form-item(label='条件名称')
              el-input(v-model='formData.name', placeholder='请输入条件名称' )
            el-form-item(label='脚本名')
              el-autocomplete(
                style="width: 100%",
                v-model='formData.script', 
                :fetch-suggestions='querySearch', 
                placeholder='请输入脚本名称', 
                @select='handleSelect')
      div( v-else ) 
        el-form( :model='form[0]' )
          el-form-item(label='条件名称')
            el-input(v-model='form[0].name', placeholder='请输入条件名称' )
          el-form-item(label='脚本名')
            el-autocomplete(
              style="width: 100%",
              v-model='form[0].script', 
              :fetch-suggestions='querySearch', 
              placeholder='请输入脚本名称', 
              @select='handleSelect')
    .dialog-footer(slot='footer')
      el-button(@click='dialogVisible = false') 取 消
      el-button(type='primary', @click='setNode') 确定
  binary-tree( :nodeData="binary_trees", @nodeClick="nodeClick", ref="bTree", @addClick="addClick", @editClick="editClick")
  
</template>

<script>
import binaryTree from '@/components/binary_tree.vue';
import { Dialog, Button, Input, Row, Col, Select, Option, autocomplete, Form, FormItem } from 'element-ui';
export default {
  components: { 
    binaryTree, 
    elDialog: Dialog, 
    elButton: Button, 
    elRow: Row,
    elCol: Col,
    elSelect: Select,
    elOption: Option,
    elAutocomplete: autocomplete,
    elForm: Form,
    elFormItem: FormItem,
    elInput: Input },
  methods: {
    close() {
      this.form.map((item) => {
        item.name = '';
      })
    },
    querySearch(queryString, cb) {
        var restaurants = this.restaurants;
        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
    createFilter(queryString) {
      return (restaurant) => {
        return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
    handleSelect(item) {
    },
    nodeClick({node}) {
      // this.dialogVisible = !this.dialogVisible;
      // console.log(path, 'vm')
      // this.$refs['bTree'].addNode(node, {
      //   name: '撒大法节点'
      // });
    },
    setNode() {
      this.dialogVisible = false;
      if(!this.isEdit) {
        this.form.map((formData) => {
          if(formData.name) {
            this.$refs['bTree'].addNode(this.currNode, {
              name: formData.name,
              // value: 
              value: formData.script
            });
          }
        })
      }else {
        // this
        this.$refs['bTree'].editNode(this.currNode, {
          name: this.form[0].name,
          value: this.form[0].script
        })
      }
      
      // if(this.currNode) {
      //   this.$refs['bTree'].addNode(this.currNode, {
      //     name: '撒大法节点'
      //   });
      // }
    },
    addClick({node}) {
      this.isEdit = false;
      this.dialogVisible = true;
      this.currNode = node;

    },
    editClick({node}) {
      this.isEdit = true;
      this.currNode = node;
      this.dialogVisible = true;
      this.form[0].name = node.name;
      this.form[0].script = node.value;
    }
  },
  mounted() {
  },
  data() {
    return {
      currNode: null,
      isEdit: false,
      dialogVisible: false,
      restaurants: [{
        // value: '1',
        value: '好撒大dsaf法'
      },
      {
        // value: '2',
        value: '个咖啡机'
      },
      {
        // value: '3',
        value: '的感觉'
      },
      {
        // label: '4',
        value: '5发撒开'
      }
      ],
      form: [{
        name: '',
        script: ''
      }, {
        name: '',
        script: ''
      }],
      binary_trees: {
        name: '哈哈',
        value: '11',
        level: 0,
        width: 800
          // width: 400,
      }
    }
  }
}
</script>
<style lang="stylus" scoped>

</style>


