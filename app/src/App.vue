<template>
  <div>
    <Header></Header>
    <!-- 路由组件出口 -->
    <router-view></router-view>
    <Footer v-show="$route.meta.showFooter"></Footer>
  </div>
</template>

<script>
import Header from '@/components/Header/index'
import Footer from '@/components/Footer/index'
export default {
  name: 'App',
  components: {
    Header,
    Footer
  },
  async mounted () {
    // 调用Vuex发送请求，获取数据，存储于仓库中
    this.$store.dispatch('homeStore/categoryList')
  }
}
</script>

<style>
</style>
