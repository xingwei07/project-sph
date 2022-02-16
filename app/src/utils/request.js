// 二次封装 axios
import axios from 'axios'

// 引入进度条
import nprogress from 'nprogress'
// 引入进度条样式
import 'nprogress/nprogress.css'

// 1. 利用axios对象的方法create，去创建一个axios实例
// 2. services 就是 axios，只不过稍微配置一下
const service = axios.create({
  // 配置对象
  // 基础路径，发送请求的时候，路径当中会出现api
  // baseURL: 'http://39.98.123.211',
  timeout: 5000
})

// 请求拦截器：在发送请求之前，请求拦截器可以监测到，可以在请求发送之前做一些处理
service.interceptors.request.use(
  // config：配置对象，对象里面有一个属性很重要，header请求头
  (config) => {
    if (config.method === 'post') {
      if (config.data === undefined || config.data === '' || config.data === null) {
        config.data = {}
      }
    }
    nprogress.start()
    return config
  },
  (err) => {
    return Promise.reject(err)
  }
)

// 响应拦截器
service.interceptors.response.use(
  (res) => {
    nprogress.done()
    return res.data
  },
  (err) => {
    nprogress.done()
    return Promise.reject(err)
  }
)

// 封装 GET 请求
export function get (url) {
  return service.request({
    method: 'GET',
    url
  })
}

// 封装 POST 请求
export function post (url, data) {
  return service.request({
    method: 'POST',
    url,
    data
  })
}

export default service