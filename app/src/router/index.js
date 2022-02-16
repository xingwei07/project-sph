import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter)

// 先VueRouter原型对象的push|replace保存一份
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;

// 重写 push|replace
// 第一个参数：跳转路径
// call与apply：
//    相同点：都可以调用函数一次，都可以篡改函数的上下文一次
//    不同点：call与apply传递参数：call传递参数用逗号隔开，apply方法执行，传递数组
VueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve && reject) {
    originPush.call(this, location, resolve, reject);
  } else {
    originPush.call(this, location, () => { }, () => { })
  }
}

VueRouter.prototype.replace = function (location, resolve, reject) {
  if (resolve && reject) {
    originReplace.call(this, location, resolve, rejece)
  } else {
    originReplace.call(this, location, () => { }, () => { })
  }
}

export default new VueRouter({
  routes: [
    {
      name: 'Home',
      path: '/home',
      component: () => import('@/pages/Home'),
      meta: {
        showFooter: true
      }
    },
    {
      name: 'Login',
      path: '/login',
      component: () => import('@/pages/Login')
    },
    {
      name: 'Register',
      path: '/register',
      component: () => import('@/pages/Register')
    },
    {
      name: 'Search',
      path: '/search/:keyWords?', // ?：占位参数可传可不传
      component: () => import('@/pages/Search'),
      // 路由组件传递props
      // 布尔值传递参数：只能传递params参数
      // props: true,
      // 对象写法：额外的给路由组件传递一些props
      // props: {1: 1, b: 2},
      // 函数写法：可以传递params参数、query参数
      props ($route) {
        return {
          keyWords: $route.params.keyWords,
          // keyWords: $route.query.keyWords
        }
      },
      meta: {
        showFooter: true
      }
    },
    // 重定向：在项目跑起来的时候，访问/，立马让他定向到首页
    {
      path: '/',
      redirect: '/home'
    }
  ]
})