<template>
  <div  class="swiper-demo">
      <swiper :options="swiperOption" ref="mySwiper" @someSwiperEvent="callback">
        <!-- slides -->
        <swiper-slide class="swiper-slide" v-for="(slide) in slides" :key="slide">

          <div class="goods" :style="{ 'background-image': 'url('+ slide.bg+ ')'}">
             
          </div>
        </swiper-slide>
        
        <!-- Optional controls -->
       
      </swiper>
  </div>
</template>
<script>
import Vue from 'vue'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
Vue.use(VueAwesomeSwiper, /* { default global options } */)
export default {
  name: 'swiper-demo',
  data() {
    return {
      slides: [
        {
          bg: require('@/images/swiper/001.jpg')
        },
        {
          bg: require('@/images/swiper/002.jpg')
        },
        {
          bg: require('@/images/swiper/003.jpg')
        },
        {
          bg: require('@/images/swiper/004.jpg')
        },
        {
          bg: require('@/images/swiper/005.jpg')
        }
        
      ],
      swiperOption: {
        slidesPerView: 'auto',
        watchSlidesProgress: true,
        slidesOffsetBefore: 37,
        spaceBetween: 17,
        //20
        resistanceRatio: 1
      }
    }
  },
  methods: {
    callback() {

    }
  }
}
</script>
<style scoped>
  .swiper-demo {
    width: 100vw;
    margin: 40px auto;
  }
  .swiper-demo .swiper-slide {
    width: 395px;
  }
  .swiper-demo .swiper-slide .goods {
    width: 375px;
    padding: 10px;
    height: 500px;
    margin: 40px 0;
    border-radius: 8px;
    /* background: url(../images/swiper/goods-bg.png); */
    background-repeat: no-repeat;
    background-size: 100% auto;
  }
</style>


