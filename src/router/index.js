import Vue from 'vue'
import Router from 'vue-router'

let __import__ = (path) => {
  return resolve => import('@/' + path)
};
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: __import__('page/index.vue')
    },
    
    {
      path: '/flv',
      name: 'flv',
      component: __import__('page/flv.vue')
    },
    {
      path: '/bScroll',
      name: 'bScroll',
      component: __import__('page/bscroll.vue')
    },
    {
      path: '/infinity_scroll',
      name: 'infinityScroll',
      component: __import__('page/infinity-scroll.vue')
    },
    {
      path: '/prismjs',
      name: 'prismjs',
      component: __import__('page/prismjs.vue')
    },
    {
      path: '/flex',
      name: 'flex',
      component: __import__('page/flex.vue')
    },
    {
      path: '/swiper',
      name: 'swiper',
      component: __import__('page/swiper.vue')
    },
    {
      path: '/ziwan',
      name: 'ziwan',
      component: __import__('page/ziwan.vue')
    },
    {
      path: '/binary_tree',
      name: 'binaryTree',
      component: __import__('page/binary-tree.vue')
    },
   

    
  ]
})
