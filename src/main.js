import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store'
import i18n from './lang/index'
import '@/router/verify.js'// 路由拦截
import '@/components/svgIcon'
import { Message, MessageBox, Form, FormItem, Input, Button, Dropdown, DropdownItem, DropdownMenu, Icon } from 'element-ui'

import './assets/scss/reset.scss'

Vue.config.productionTip = false

Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Button)
Vue.use(Dropdown)
Vue.use(DropdownItem)
Vue.use(DropdownMenu)
Vue.use(Icon)

Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt
Vue.prototype.$message = Message

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
