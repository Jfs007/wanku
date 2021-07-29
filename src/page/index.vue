<template>
  <div class="index">
    <ul class="lib-item">
      <li
        @click="link(lib.link)" 
        class="lib-list"
        :class="['lib-bg-'+(index+1 > 11 ? 11 : index+1 )]" 
        v-for="(lib, index) in libs" :key="lib.name"
      >
          <span>{{lib.name}}</span> 
      </li>
      <li
        class="lib-list hidden"
        v-if="libs.length%3"
      ></li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'index',
  data() {
    return {
      libs: [
        {
          name: 'range',
          link: 'range'
        },
        {
          name: 'flex',
          link: 'flex'
        },
        {
          name: 'bScroll',
          link: 'bScroll'
        },
        {
          name: 'infinityScroll',
          link: 'infinity_scroll'
        },
        {
          name: 'flv',
          link: 'flv'
        },
        {
          name: 'prismjs',
          link: 'prismjs'
        },
        {
          name: 'swiper',
          link: 'swiper'
        },
        {
          name: 'ziwan',
          link: 'ziwan'
        },
        {
          name: 'binaryTree',
          link: 'binary_tree'
        },
       
      ]
    }
  },
  methods: {
    link(link) {
      this.$router.push({
        path: link
      })
    }
  }
}
</script>
<style scoped>
  ul, li {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .index {
    background-color: #c2ddbf;
    height: 100vh;
  }
  .lib-item {
    display: flex;
    -webkit-flex-wrap: wrap;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
  }
  .lib-item .lib-list {
    width: 50%;
    height: 200px;
    cursor: pointer;
    color: #fff;
    line-height: 200px;
    text-align: center;
    font-size: 10vw;
  } 
  .lib-item .lib-list:hover {
    box-shadow: 0 1px 2px 0 rgba(0,0,0,.1);
  }
  .lib-item .lib-list.hidden {
    height: 0;
    visibility: hidden;
    margin: 0;
    padding: 0;
  }
  .lib-bg-1 {
    background-color: #7fc9ac
  }
  .lib-bg-2 {
    background-color: #87ccae
  }
  .lib-bg-3 {
    background-color: #90ceb1
  }
  .lib-bg-4 {
    background-color: #98d1b3
  }
  .lib-bg-5 {
    background-color: #a0d3b5
  }
  .lib-bg-6 {
    background-color: #a9d6b8
  }
  .lib-bg-7 {
    background-color: #b1d8ba
  }
  .lib-bg-8 {
    background-color: #c2ddbf
  }
  .lib-bg-9 {
    background-color: #cae0c1
  }
  .lib-bg-10 {
    background-color: #d3e2c4
  }
  .lib-bg-11 {
    background-color: #dbe5c6
  }

</style>



