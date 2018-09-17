<template lang="pug">
div
  rich-input( :items="items", :models="models")
</template>
<script>
import richInput from '../components/rich-input'
export default {
  name: 'ziwan',
  components: {richInput},
  data() {
    return {
      items: [
        { value: '火箭0', cate: 'system' },
        { value: '可爱', cate: 'system' },
        { value: '奇怪', cate: 'system' },
        { value: '奇怪', cate: 'system' },
        { value: '1奇a怪', cate: 'system' },
        { value: '23奇怪', cate: 'system' },
        { value: '好奇怪', cate: 'system' },
        { value: '奇1怪', cate: 'system' },
        { value: '1火箭3', cate: 'system' },
        { value: '3火箭4', cate: 'system' }
      ],
      models: 'asdfasd#¥ @system/奇怪 asd<br>asdfadf1sdf<br><br><br>var = [<br> @system/火箭0 &nbsp;= sdfad<br>sadfafd<br>return ds @system/火箭0 <br><br>]&nbsp;<br>sadf @system/奇怪 <br>sadfsadf @system/奇怪 <br><br> @system/可爱 <br>'
    }
  },
  mounted() {
  },
  methods: {
   
  },
  
}
</script>

