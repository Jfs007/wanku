<template >
  <div class="prismjs">
    <pre class="code"  data-start="0" ref="pres" >
      <code class="language-json" v-html="code" ></code>
    </pre> 
    
  </div>   

</template>
<script>
let json = 
    `[
       {  
         "value":"国航系",
         "name":"国航系",
         "key":"carrType",
         "child":[
           {
             "name":"澳门航空",
             "value":"NX",
             "key":"airline"
           },
           {
             "name":"国航",
             "value":"CA",
             "key":"airline"
           },
           {
             "name":"山航",
             "value":"SC",
             "key":"airline"
           },
           {
             "name":"深航",
             "value":"ZH",
             "key":"airline"
           },
           {
             "name":"西藏航空",
             "value":"TV",
             "key":"airline"
           }
          ]
        } 
      ]`
import Prism from 'prismjs';
export default {
  name: 'prismjs',
  data() {
    return {
      code: '',
      interval: 10
    }
  },
  created() {
    
    
    
  },
  mounted() {
    setTimeout(() => {
      this.$nextTick(() => {
        this.updateJson();
      })
    }, 200);
    
  },
  methods: {
    toHtml(j) {
      this.$nextTick(() => {
        var html = Prism.highlight(j, Prism.languages.json, 'json');
        this.code = html;
      })
    },
    updateJson() {
      let timer = null;
      let json_l = json.length;
      let current_text = '';
      timer = setInterval(() => {
        let current_text_l = current_text.length;
        if(current_text_l>=json_l) {
          clearInterval(timer);
          timer = null;
        }else {
          current_text+= json.substring(current_text_l, current_text_l+1)|| ' ';
        }
        if(current_text.substring(current_text_l-1, current_text_l) === '\n'&&this.$refs['pres']) {
          this.$nextTick(() => {
            this.$refs['pres'].scrollTop = 100000;
          })
        }
        this.toHtml(current_text);
      }, this.interval)
    }
  }
}
</script>
<style scoped>
  
  .prismjs .code {
    width: 100vw;
    height: 100vh;
    overflow-y: auto;
   
  }
</style>

<style>
  html, body, pre, pre[class*="language-"], code {
    margin: 0;
    padding: 0;
     box-sizing: border-box;
  }
</style>


