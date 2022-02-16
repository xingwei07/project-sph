import { reqCatrgoryList, reqGetBannerList, reqGetFloorList } from '@/utils'

const homeStore = {
  // 开启命名空间
  namespaced: true,
  state: {
    categoryList: [], // 三级联动列表
    bannerList: [], // 首页轮播图数据
    floorList: [] // floor组件的数据
  },
  mutations: {
    // 三级联动列表
    CATEGORYLIST (state, value) {
      // console.log("修改仓库中的数据")
      state.categoryList = value
    },
    GETBANNERLIST (state, value) {
      state.bannerList = value
    },
    GETFLOORLIST (state, value) {
      state.floorList = value
    }
  },
  actions: {
    // 三级联动列表
    async categoryList (context) {
      // console.log("开始发送请求，获取轮播图数据")
      const req = await reqCatrgoryList()
      if (req.code === 200) {
        context.commit('CATEGORYLIST', req.data)
      }
    },
    // 首页轮播图数据
    async getBannerList (context) {
      const req = await reqGetBannerList()
      if (req.code === 200) {
        context.commit('GETBANNERLIST', req.data)
      }
    },
    // 获取floor数据
    async getFloorList (context) {
      const req = await reqGetFloorList()
      if (req.code === 200) {
        context.commit('GETFLOORLIST', req.data)
      }
    }
  },
  getters: {}
}

export default homeStore