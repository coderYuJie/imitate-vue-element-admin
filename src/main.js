import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store'
import i18n from './lang/index'
import '@/router/verify.js'// 路由拦截
Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
