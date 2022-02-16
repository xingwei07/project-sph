module.exports = {
  // 关闭eslint
  lintOnSave: false,
  //开启代理服务器
  devServer: {
    proxy: {
      '/api': {
        target: 'http://39.98.123.211',
        //重写路径
        // pathRewrite: { '/api': '' },
        // ws: true, //用于支持websocket
        // changeOrigin: true //用于控制请求中的host值
      },
      '/mock': {
        target: 'http://localhost:8080',
        // pathRewrite: { '/mock': '' },
      }
    }
  }
}