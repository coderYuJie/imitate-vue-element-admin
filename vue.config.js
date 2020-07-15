module.exports = {
  devServer: {
    port: 8080,
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
  }
}
