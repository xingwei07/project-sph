import { reqGetSearchInfo } from '@/utils'
const srarchStore = {
  // 开启命名空间
  namespaced: true,
  state: {
    searchInfo: {}
  },
  mutations: {
    GETSEARCHINFO (state, data) {
      state.searchInfo = data
    }
  },
  actions: {
    // 获取搜索模块数据
    async getSearchInfo (context, params) {
      const req = await reqGetSearchInfo(params)
      if (req.code === 200) {
        context.commit('GETSEARCHINFO', req.data)
      }
    }
  },
  // 计算属性，为了简化仓库中的数据
  getters: {
    // 商品列表
    goodsList (state) {
      return state.searchInfo.goodsList || []
    },
    // 品牌列表
    trademarkList (state) {
      return state.searchInfo.trademarkList || []
    },
    // 属性列表
    attrsList (state) {
      return state.searchInfo.attrsList || []
    },
    // // 商品总数
    // total (state) {
    //   return state.searchInfo.total
    // },
  }
}

export default srarchStore