import { get, post } from './request'

// 三级联动接口
// /api/product/getBaseCategoryList  get  无参数
// 发请求：axios发请求返回结果为Promise对象
export async function reqCatrgoryList () {
  // return await get('/api/product/getBaseCategoryList')
  return await get('/mock/category')
}

// 获取banner（Home首页轮播图）接口
export async function reqGetBannerList () {
  return await get('/mock/banner')
}

// 获取floor数据
export async function reqGetFloorList () {
  return await get('/mock/floor')
}