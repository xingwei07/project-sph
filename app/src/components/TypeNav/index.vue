<template>
  <div class="type-nav">
    <div class="container">
      <div @mouseenter="isShow = true" @mouseleave="leaveShow">
        <h2 class="all">全部商品分类</h2>
        <transition name="sort">
          <div class="sort" @click="goSearch" v-show="isShow">
            <div class="all-sort-list2">
              <div
                @mouseover="changeIndex(index)"
                class="item"
                v-for="(c1, index) in categoryList"
                :key="c1.categoryId"
                :class="{ cur: currentIndex == index }"
              >
                <h3>
                  <!-- 一级分类 -->
                  <!-- <router-link
                :to="{
                  path: '/search',
                  query: {
                    categoryName: c1.categoryName,
                    categoryId: c1.categoryId
                  }
                }"
              >
                {{ c1.categoryName }}
              </router-link> -->
                  <!-- <a
                href=""
                @click.prevent="openSearch(c1.categoryName, c1.categoryId)"
                >{{ c1.categoryName }}</a
              > -->
                  <a
                    :data-categoryName="c1.categoryName"
                    :data-category1Id="c1.categoryId"
                    >{{ c1.categoryName }}</a
                  >
                </h3>
                <div
                  class="item-list clearfix"
                  :style="{ display: currentIndex == index ? 'block' : 'none' }"
                >
                  <div class="subitem">
                    <dl
                      class="fore"
                      v-for="c2 in c1.categoryChild"
                      :key="c2.categoryId"
                    >
                      <dt>
                        <!-- 二级分类 -->
                        <!-- <router-link
                      :to="{
                        path: '/search',
                        query: {
                          categoryName: c2.categoryName,
                          categoryId: c2.categoryId
                        }
                      }"
                    >
                      {{ c2.categoryName }}
                    </router-link> -->
                        <!-- <a
                      href=""
                      @click.prevent="
                        openSearch(c2.categoryName, c2.categoryId)
                      "
                    >
                      {{ c2.categoryName }}
                    </a> -->
                        <a
                          :data-categoryName="c2.categoryName"
                          :data-category2Id="c2.categoryId"
                          >{{ c2.categoryName }}</a
                        >
                      </dt>
                      <dd>
                        <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                          <!-- 三级分类 -->
                          <!-- <router-link
                        :to="{
                          path: '/search',
                          query: {
                            categoryName: c3.categoryName,
                            categoryId: c3.categoryId
                          }
                        }"
                      >
                        {{ c3.categoryName }}
                      </router-link> -->
                          <!-- <a
                        href=""
                        @click.prevent="
                          openSearch(c3.categoryName, c3.categoryId)
                        "
                        >{{ c3.categoryName }}</a
                      > -->
                          <a
                            :data-categoryName="c3.categoryName"
                            :data-category3Id="c3.categoryId"
                            >{{ c3.categoryName }}</a
                          >
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import throttle from 'lodash/throttle'

export default {
  name: 'TypeNav',
  data () {
    return {
      // 存储一级分类的索引
      currentIndex: -1,
      isShow: true
    }
  },
  mounted () {
    // 当组件挂载完毕，如果是Search则隐藏TypeNav
    if (this.$route.name !== 'Home') {
      this.isShow = false
    }
  },
  computed: {
    ...mapState('homeStore', ['categoryList'])
  },
  methods: {
    // 鼠标移入 修改属性
    // changeIndex (index) {
    //   this.currentIndex = index
    // },
    changeIndex: throttle(function (index) {
      this.currentIndex = index
    }, 50),
    // 鼠标移出
    leaveShow () {
      this.currentIndex = -1
      if (this.$route.name !== 'Home') {
        this.isShow = false
      }
    },
    // openSearch (name, id) {
    //   this.$router.push({
    //     name: 'Search',
    //     query: {
    //       categoryName: name,
    //       categoryId: id
    //     }
    //   })
    // },
    // 进行路由跳转的方法
    goSearch (event) {
      // 最好的解决方案：编程式导航 + 事件委派
      // 获取到当前触发这个事件的节点
      let element = event.target;
      // 通过dataset属性，可以获取节点的自定义属性与属性值
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
        const location = {
          name: 'Search',
          query: query
        }
        // 路由跳转
        if (this.$route.params) {
          location.params = this.$route.params
        }
        this.$router.push(location) // 路由跳转
        this.isShow = false // 隐藏三级分类菜单
      }
    }
  }
}
</script>

<style scoped lang="less">
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          // &:hover {
          //   .item-list {
          //     display: block;
          //   }
          // }
        }
        .cur {
          background-color: skyblue;
        }
        // .item:hover {
        //   background-color: skyblue;
        // }
      }
    }
    // 过渡动画的样式
    // 过渡动画开始状态（进入）
    .sort-enter {
      height: 0;
    }
    // 过度动画结束状态（进入）
    .sort-enter-to {
      height: 461px;
    }
    // 定义动画时间、速率
    .sort-enter-active {
      transition: all 0.5s linear;
    }
  }
}
</style>