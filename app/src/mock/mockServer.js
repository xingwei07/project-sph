// 引入mockjs模块
import Mock from 'mockjs'

// 引入模拟数据
// webpack默认暴露：图片、json文件
import banner from './banner.json'
import floor from './floor.json'
import category from './category.json'

// mock数据：第一个参数：请求地址  第二个参数：请求数据
Mock.mock("/mock/banner", { code: 200, data: banner }); // 模拟首页大的轮播图数据
Mock.mock("/mock/floor", { code: 200, data: floor }); // 
Mock.mock("/mock/category", category); // 商品分类