import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store'
import i18n from './lang/index'
import '@/router/verify.js'// 路由拦截
import '@/components/svg-icon'
import Element from 'element-ui'

import './assets/scss/reset.scss'
import Router from 'vue-router'
import { getSize } from './utils/size'
Vue.config.devtools = true
// 解决路由重定向报错
Vue.config.productionTip = false
const routerPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return routerPush.call(this, location).catch(error => error)
}

Vue.use(Element, {
  size: getSize() || 'medium'
})

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
