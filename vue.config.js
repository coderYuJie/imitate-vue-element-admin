const path = require('path')

function resolve (dir) {
  return path.join(__dirname, '.', dir)
}
module.exports = {
  lintOnSave: false,
  devServer: {
    port: 8888,
    hot: true,
    open: true,
    proxy: {
      '/dev': {
        target: 'https://www.fastmock.site/mock/cdce7fe9d7486bc74617afb9c84db31f/imitate-vue-admin',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '/dev': '/'
        }
      }
    }
  },
  chainWebpack: config => {
    config.module.rules.delete('svg') // 重点:删除默认配置中处理svg,
    // const svgRule = config.module.rule('svg')
    // svgRule.uses.clear()
    config.module
      .rule('svg-sprite-loader')
      .test(/\.svg$/)
      .include
      .add(resolve('src/assets/svg')) // 处理svg目录
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
  },
  // 配置scss全局变量
  css: {
    loaderOptions: {
      sass: {
        prependData: `
        @import"@/assets/scss/var.scss";
        @import"@/assets/scss/mixin.scss";
        `
      }
    }
  }
}
