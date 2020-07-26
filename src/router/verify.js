import router from './index'
import store from '@/store'
import { getToken } from '@/utils/auth'

const whiteList = ['/login']

router.beforeEach(async (to, from, next) => {
  const hasToken = getToken()
  if (hasToken) {
    if (to.path === '/login') {
      next('/')
    } else {
      const hasRoles = store.state.user.roles && store.state.user.roles.length > 0
      if (hasRoles) {
        next()
      } else {
        try {
          const { roles } = await store.dispatch('user/getInfo')
          const accessedRoutes = await store.dispatch('verify/generateRoutes', roles)
          router.addRoutes(accessedRoutes)
          next({ ...to, replace: true })
        } catch (e) {
          next(`/login?redirect=${to.path}`)
        }
      }
    }
  } else {
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next(`/login?redirect=${to.path}`)
    }
  }
})
