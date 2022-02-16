# Day01

## 1. 文件组成：

├── `node_modules` 文件夹：项目依赖文件夹
├── `public` 文件夹：一般放置一些静态资源（图片），
│ 需要注意，放在 public 文件夹中的静态资源，webpack 进行打包的时候，会原封不动打包到 dist 文件夹中
├── `src` 文件夹（程序员源代码文件夹）：
│ ├── `assets` 文件夹：一般也是放置静态资源（一般放置多个组件公用的静态资源），
│ │ 需要注意，放置在 assets 文件夹里面静态资源，
│ │ 在 webpack 打包的时候，webpack 会把静态资源当做一个模块，打包到 JS 文件里。  
│ ├── `components` 文件夹：一般放置的是非路由组件（全局组件）
│ ├── `APP.vue`：唯一的根组件，Vue 当中的组件（.vue）
│ └── `main.js`：程序入口文件，也是整个程序当中最先执行的文件
├── `babel.config.js`：配置文件（babel 相关）
├── `package.json` 文件：认为是项目的身份证，记录了项目的一些信息：名字、依赖、怎么运行
├── `package-lock.json`：缓存性文件
└── `README.md`：说明性文件

## 2. 项目的其他配置

1.  项目运行起来的时候，让浏览器自动打开
    - package.json
    ```js
    "scripts": {
      "serve": "vue-cli-service serve --open",
      "build": "vue-cli-service build",
      "lint": "vue-cli-service lint"
    },
    ```
2.  eslint 校验功能关闭

    - `vue.config.js`

    ```js
    module.exports = {
      // 关闭eslint
      lintOnSave: false,
    };
    ```

3.  src 文件夹简写方法，配置别名。`@`

    - `jsconfig.json` 配置别名@提示【@代表的是 src 文件夹，这样将来文件过多，找的时候方便很多】

    ```js
    {
      "compilerOptions": {
        "baseUrl": "./",
        "paths": {
          "@/*": ["src/*"]
        }
      },
      "exclude": ["node_modules", "dist"] // 这两个文件夹里不能使用
    }
    ```

## 3. 项目路由的分析

`vue-router`
前端所谓的路由：KV 键值对。
key：URL（地址栏中的路径）
value：相应的路由组件
注意：上中下结构

路由组件：

- `Home` 首页路由组件、`Search` 路由组件、`Login` 登录路由、`Register` 注册路由

非路由组件：

- `Header`【首页、搜索页】
- `Footer`【首页、搜索页】，登录、注册页没有

## 4. 完成非路由组件 Header 与 Footer 业务

1.  书写静态页面（HTML+CSS）
2.  拆分组件
3.  获取服务器的数据动态显示
4.  完成相应的动态业务逻辑

> 注意 1：创建组件的时候，组件的结构 + 组件的样式 + 静态资源
> 注意 2：项目采用的 less 样式，浏览器不识别 less 样式，需用通过 less、less-loader【安装 5 版本】 进行处理 less，浏览器才可以识别。
> `cnpm install --save less@3 less-loader@5`
> 注意 3：如果想让组件识别 less 样式，需要在 style 标签上添加 `lang="less"`

## 5. 路由组件的搭建

在上面分析的时候，路由组件应该有四个：`Home`、`Search`、`Login`、`Register`

> 安装路由插件 `cnpm install --save vue-router`
> components 文件夹：经常放置非路由组件（共用的全局组件）
> pages|views 文件夹：经常放置路由组件

1.  配置路由
    项目当中配置的路由一般放置在 router 文件夹中

2.  总结

    ```
    路由组件与非路由组件的区别？
       1. 路由组件一般放置在 pages|views 文件夹，得路由组件一般放置在 components 文件夹中
       2. 路由组件一般需要在 router 文件夹中进行注册（使用的即为组件的名字），非路由组件在使用的时候一般以标签的形式使用。
       3. 注册完路由，不管是路由组件、还是非路由组件身上都有$route、$router

    $route：一般获取路由信息【路径、query、params等】
    $router：一般进行编程式路由导航【push|replace】
    ```

3.  路由的跳转？

    ```
    路由的跳转有两种形式：
       声明式导航 router-link，可以进行路由跳转
       编程式导航 push|replace，可以进行路由跳转

       编程式导航：声明式导航能做的，编程式导航都能做，但是编程式导航除了可以进行路由跳转，还可以做一些其他的业务逻辑。
    ```

## 6. Footer 组件显示与隐藏

显示或隐藏组件：v-if|v-show
Footer 组件：在首页、查询的时候显示
Footer 组件：在登陆、注册的时候隐藏

1.  我们可以根据组件身上的 $route 获取当前的路径判断 Footer 显示与隐藏。
2.  配置路由的时候，可以给路由添加路由元信息【meta】，路由需要配置对象，它的 key 不能随便写。

## 7. 路由传参

1.  路由跳转有几种方式？
    比如：A -> B
    `声明式导航`：router-link（务必要有 to 属性），可以实现路由的跳转
    `编程式导航`：利用的是组件实例的$router.push|replace 方法，可以实现路由的跳转。（可以书写一些自己的逻辑）

2.  路由传参，参数有几种写法？
    `params` 参数：属于路径当中的一部分，需要注意，在配置路由的时候，需要占位
    `query` 参数：不属于路径当中的一部分，类似于 ajax 中的 queryString /home?k=v&k=v，不需要占位

## 8. 路由传参相关`面试题`

1.  路由传递参数（对象写法）path 是否可以结合 params 参数一起使用？
    `路由跳转传参的时候，对象的写法可以是 name、path 形式，但是需要注意的是，path这种写法不能与params参数一起使用`
2.  如何指定 params 参数可传可不传？
    `如果路由要求传递params参数(已经进行占位)，但是就是不传，URL会出现问题`
    `如何指定params可传可不传？在配置路由的时候，在占位的后面加上一个问号【params可以传递或不传递】`
3.  params 参数可以传递也可以不传递，但是如果传递是空串，如何解决？
    ```js
    使用undefined解决：
    this.$router.push({
      name: 'Search',
      params: {
        keyWords: '' || undefined
      }
    })
    ```
4.  路由组件能不能传递 props 参数？

    ```js
    可以
    // 1.布尔值传递参数：只能传递params参数
    // props: true,
    // 2.对象写法：额外的给路由组件传递一些props
    // props: {1: 1, b: 2},
    // 3.函数写法：可以传递params参数、query参数
    props ($route) {
      return {
         // keyWords: $route.params.keyWords,
         keyWords: $route.query.keyWords
      }
    },
    ```

# Day02

1.编程式路由跳转到当前路由(参数不变)，多次执行会抛出 NavigationDuplid 的警告错误？

- 路由跳转有两种形式：声明式导航、编程式导航
- 声明式导航没有这类问题，因为 vue-router 底层已经处理好了

  1.1. 为什么编程式导航进行路由跳转的时候，就有这种警告了呢？
  `"vue-router": "~3.5.3"：最新的 vue-router 引入了 promise`

  1.2. 怎么解决？
  `通过给 push 方法传递相应的成功、失败的回调函数，可以捕获到当前错误，可以解决。`

```js
this.$router.push(
  {
    name: "Search",
    params: {
      keyWords: this.keyWords,
    },
    query: {
      keyWords: this.keyWords,
    },
  },
  () => {},
  () => {}
);
```

这种写法：`治标不治本`，将来在别的组件当中使用 push|replace，编程式导航还是有类似的错误。

**根本解决方法：**

```js
// 先将VueRouter原型对象的push|replace保存一份
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
    originPush.call(
      this,
      location,
      () => {},
      () => {}
    );
  }
};

VueRouter.prototype.replace = function (location, resolve, reject) {
  if (resolve && reject) {
    originReplace.call(this, location, resolve, rejece);
  } else {
    originReplace.call(
      this,
      location,
      () => {},
      () => {}
    );
  }
};
```

2. Home 模块组件拆分

3. 三级联动组件完成

4. 完成其它静态组件

5. PostMan 测试接口
   如果服务器返回的数据 code 为 200，代表服务器返回数据成功
   整个项目，接口前缀都有/api 字样
6. axios 二次封装

   ```js
   // 安装 axios
   cnpm install --save axios

   utils/request.js
   ```

   1. 为什么需要进行二次封装？
      请求拦截器：可以在发送请求之前处理一些业务
      响应拦截器：当服务器数据返回以后，可以处理一些事情

   2. 在项目中有 api 文件夹【axios】
      接口当中：路径带有/api
      baseURL: '/api'

7. 接口统一管理
   ```
   utils/index.js
   ```
8. nprogress 进度条的使用

   ```js
   cnpm install --save nprogress

   // 引入进度条
   import nprogress from 'nprogress'
   // 引入进度条样式
   import 'nprogress/nprogress.css'

   nprogress.start()
   nprogress.done()
   ```

9. vuex 状态管理库
   `cnpm install --save vuex`

   1. vuex 是什么？
      `vuex是官方提供的一个插件：状态管理库，集中式管理项目中组件公用的数据。`
   2. vuex 基本使用
      `state` `actions` `mutations` `setters`

      `new Vuex.Store({}) `

   3. 模块式开发

      ```js
      import Vue from "vue";
      import Vuex from "vuex";

      import homeStore from "./home";
      import searchStore from "./search";

      Vue.use(Vuex);

      export default new Vuex.Store({
        modules: {
          homeStore,
          searchStore,
        },
      });
      ```

10. 完成 TypeNav 三级联动展示数据

# Day03

## 1.完成一级分类动态添加背景颜色

- 第一种解决方案：采用样式完成
  ```css
  .item:hover {
    background-color: skyblue;
  }
  ```
- 第二种解决方案：采用 JS 完成

  ```js
  <!-- 鼠标移入 -->
  @mouseover="changeIndex(index)"
  <!-- 鼠标移出 -->
  @mouseleave="leaveIndex"
  <!-- 绑定样式 -->
  :class="{ cur: currentIndex == index }"
  ```

## 2.通过 JS 控制二三级商品分类的显示与隐藏

```js
:style="{ display: currentindex == index ? 'block' : 'none' }"
```

## 3.演示卡顿现象

- 正常：事件触发非常频繁，而且每一次的触发，回调函数都会去执行（如果时间很短，而回调函数内部有计算，那么很可能出现浏览器卡顿）
  `正常情况（用户慢慢的操作）`：鼠标进入，每一个一级分类，都会触发鼠标进入事件
  `非正常情况（用户操作很快）`：只有部分事件被触发
  由于用户操作过快，导致浏览器`响应不及时`。如果当前回调函数中有大量运算，有可能会出现卡顿现象

## 4.函数的防抖与节流

- 节流：在规定的时间范围内不会重复触发回调，只有大于这个时间间隔才会触发回调，把频繁触发变为少量触发
  ```js
  // 用户操作很频繁，但是把频繁的操作变为少量操作【可以给浏览器充裕的时间去解析代码】
  button.onclick = _.throttle(function () {
    span.innerHTML = ++count;
  }, 5000);
  ```
- 防抖：前面的所有的触发都被取消，最后一次执行在规定的时间后才会触发，也就是说，如果连续快速的触发，只会执行一次
  ```js
  // lodash对外暴露 【_函数】
  input.oninput = _.debounce(function () {
    console.log("Ajax请求");
  }, 1000);
  ```

## 5.完成三级联动节流的操作

`cnpm install --save lodash`

```js
// 按需引入
import throttle from 'lodash/throttle'

changeIndex: throttle(function (index) {
  this.currentIndex = index
}, 50),
```

## 6.三级联动组件的路由跳转与传递参数

```html
<!-- 声明式路由导航 -->
<router-link
  :to="{
    path: '/search',
    query: {
      categoryName: c1.categoryName,
      categoryId: c1.categoryId
    }
  }"
>
  {{ c1.categoryName }}
</router-link>
```

> 这种方式会创建很多 router-link 组件，导致卡顿

```js
<a
  href=""
  @click.prevent="
    openSearch(c2.categoryName, c2.categoryId)
  "
>
  {{ c2.categoryName }}
</a>

// 编程式路由导航
openSearch (name, id) {
  this.$router.push({
    name: 'Search',
    query: {
      categoryName: name,
      categoryId: id
    }
  })
},
```

> 这种方式会循环添加很多事件处理函数

## 7.完成三级联动路由跳转与传递参数

最好的解决方案：编程式导航 + 事件委托
存在一些问题：事件委派是把所有的子节点的事件委派给父节点，点击 a 标签的时候才会进行路由跳转，需要从中区分出 a 标签
另一个问题：怎么区分点击的是一级、二级、三级分类的标签

```js
// 解决以上问题：添加自定义属性
<a
  :data-categoryName="c1.categoryName"
  :data-category1Id="c1.categoryId"
  >{{ c1.categoryName }}</a
>

goSearch (event) {
  // 获取到当前触发这个事件的节点
  let element = event.target;
  // 通过dataset属性，可以获取节点的自定义属性与属性值 所有属性值均会转为小写
  let { categoryname, category1id, category2id, category3id } = element.dataset;

  // 带有categoryname的一定是a标签
  if (categoryname) {
    // 路由跳转的参数
    const query = {
      categoryName: categoryname
    }
    // 一级分类、二级分类、三级分类的a标签
    if (category1id) {
      query.category1Id = category1id
    } else if (category2id) {
      query.category2Id = category2id
    } else {
      query.category3Id = category3id
    }
    // 路由跳转
    this.$router.push({
      name: 'Search',
      query: query
    })
  }
}
```

# Day04

- 1.开发 Search 模块中的 TypeNav 商品分类菜单（过渡动画效果）

  ```css
  /* 过渡动画 */
  <transition name="sort"></transition>
  
  /* 过渡动画的样式 */
  /* 过渡动画开始状态（进入） */
  .sort-enter {
    height: 0;
  }
  /* 过度动画结束状态（进入） */
  .sort-enter-to {
    height: 461px;
  }
  /* 定义动画时间、速率 */
  .sort-enter-active {
    transition: all 0.5s linear;
  }
  ```

- 2.现在的商品三级分类列表可以进行优化
  `在App组件中发送请求，只执行一次`
- 3.合并 params 与 query 参数
  ```js
  const location = {
    name: "Search",
    params: {
      keyWords: this.keyWords || undefined, // 防止传空串导致报错
    },
  };
  if (this.$route.query) {
    location.query = this.$route.query;
  }
  ```
- 4.开发 Home 首页当中的 ListContainer 组件与 Floor 组件
  但是服务器返回的数据（接口）只有商品分类菜单分类数据，对于 ListContainer 组件与 Floor 组件数据服务没有提供

  `使用mockjs`**模拟数据**：
  `cnpm install --save mockjs`

  **使用步骤**：

  1. 创建 mock 文件夹
  2. 准备 JSON 数据（mock 文件夹中相应的 JSON 文件）
  3. 把 mock 数据需要的图片放置到 public 文件夹中【public 文件夹在打包的时候，会把相应的资源原封不动打包到 dist 文件夹中】
  4. 创建 mockServer.js 通过 mockjs 插件实现模拟数据
  5. mockServe.js 文件在入口文件中引入（至少需要执行一次，才能模拟数据）

     ```js
     // 引入mockjs模块
     import Mock from "mockjs";

     // 引入模拟数据
     // webpack默认暴露：图片、json文件
     import banner from "./banner.json";
     import floor from "./floor.json";

     // mock数据：第一个参数：请求地址  第二个参数：请求数据
     Mock.mock("/api/mock/banner", { code: 200, data: banner }); // 模拟首页大的轮播图数据
     Mock.mock("/mock/floor", { code: 200, data: floor }); //
     ```

- 5.ListContainer 组件开发重点
  安装 Swiper 插件：`cnpm install --save swiper@5`

  1. 引包

     ```js
     // 引入轮播图样式 --- 入口文件 main.js
     import "swiper/css/swiper.css";

     // 需要用到轮播图的组件
     import Swiper from "swiper";
     ```

  2. 轮播图页面结构

     ```html
     <div class="swiper-container" id="mySwiper">
       <div class="swiper-wrapper">
         <div
           class="swiper-slide"
           v-for="carousel in bannerList"
           :key="carousel.id"
         >
           <img :src="carousel.imgUrl" />
         </div>
       </div>
       <!-- 如果需要分页器 -->
       <div class="swiper-pagination"></div>

       <!-- 如果需要导航按钮 -->
       <div class="swiper-button-prev"></div>
       <div class="swiper-button-next"></div>
     </div>
     ```

  3. 初始化 swiper 实例

     ```js
     new Swiper(".swiper-container", {
       loop: true, // 循环模式选项
       // 如果需要分页器
       pagination: {
         el: ".swiper-pagination",
         clickable: true, // 点击的时候跳转
       },
       // 如果需要前进后退按钮
       navigation: {
         nextEl: ".swiper-button-next",
         prevEl: ".swiper-button-prev",
       },
     });
     ```

     **问题：**在 Swiper 初始化时，还没有从服务器取得轮播图数据，导致轮播图不能翻页
     解决方案：

     ```js
     //使用watch + $nextTick解决
     watch: {
       // 监听bannerList变化，发生变化后初始化swiper
       bannerList () {
        // this.$nextTick() --- 只使用监听只能保证数据已经存在，不能保证页面已经渲染完毕
        this.$nextTick(() => {
          // 在页面渲染完毕后初始化轮播图
          new Swiper('.swiper-container', {
            loop: true, // 循环模式选项
            // 如果需要分页器
            pagination: {
              el: '.swiper-pagination',
              clickable: true, // 点击的时候跳转
            },
            // 如果需要前进后退按钮
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            },
          })
        })
      }
     }
     ```

- 6.开发 Floor 组件

  1. v-for 也可以在自定义标签中使用
  2. 组件间通信的方式：（面试频率极高）
     ```js
     props：用于父子组件通信
     自定义事件：$on $emit  可以实现子给父传递数据
     全局事件总线：$bus  任意组件间通信
     punsub-js：vue中几乎不用  任意组件间通信
     插槽：默认插槽，具名插槽，作用于插槽
     vuex
     ```

- 7.把首页中的轮播图拆分为全局组件
  注册全局组件：`Vue.component(Carousel.name, Carousel)`

- 8.开发 Search 模块
  1. 写静态界面 + 拆分组件
  2. 发请求（api）
  3. vuex 存储数据
  4. 动态展示数据
