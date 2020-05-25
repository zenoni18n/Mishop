module.exports = {
  devServer: {
    host: 'localhost',
    port: 8080,
    proxy: {
      '/api': {
        target: 'http://mall-pre.springboot.cn',
        changeOrigin: true,
        pathRewrite: {
          '/api': ''
        }
      }
    }
    // // webpack配置  删除预加载，删掉自动缓存的js文件，按需加载，优化性能
    // chainWebpack: (config) => {
    // config.plugins.delete('prefetch')
    // }
  }
  // 生产环境是否生成 sourceMap 文件
  // productionSourceMap: false,
  // publicPath: './',
  // assetsDir: 'static'
}
