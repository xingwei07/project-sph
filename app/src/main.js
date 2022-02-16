import Vue from 'vue'
import App from './App.vue'

// 引入路由
import router from '@/router'

// 引入Vuex
import store from '@/store'

// 引入mockServe.js  执行一次
import '@/mock/mockServer'

// 引入轮播图样式
import 'swiper/css/swiper.css'

// 引入全局组件
import TypeNav from '@/components/TypeNav'
import Carousel from '@/components/Carousel'

// 注册全局组件
Vue.component(TypeNav.name, TypeNav)
Vue.component(Carousel.name, Carousel)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  // 注册路由：kv一直省略v
  // 注册路由信息：当这里书写router的时候，组件身上都拥有$router、$route属性
  router,
  store
}).$mount('#app')
