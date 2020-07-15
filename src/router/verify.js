import router from './index'
// import store from '@/store'
import { getToken } from '@/utils/auth'

const whiteList = ['/login']

router.beforeEach((to, from, next) => {
  const hasToken = getToken()
  if (hasToken) {
    if (to.path === '/login') {
      next('/')
    } else {

    }
  } else {
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next(`/login?redirect=${to.path}`)
    }
  }
})
