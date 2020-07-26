import { constantRoutes, asyncRoutes } from '@/router'
const hasverify = (route, roles) => {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles && route.meta.roles.includes(role))
  } else {
    return true
  }
}
const filterAsyncRoutes = (asyncRoutes, roles) => {
  const res = []
  asyncRoutes.forEach(item => {
    const tmp = { ...item }
    if (hasverify(item, roles)) {
      if (tmp.children) {
        filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })
  return res
}

const verify = {
  namespaced: true,
  state: () => ({
    routes: [],
    addRoutes: []
  }),
  mutations: {
    SET_ROUTES: (state, routes) => {
      state.addRoutes = routes
      state.routes = constantRoutes.concat(routes)
    }
  },
  actions: {
    generateRoutes ({ commit }, roles) {
      return new Promise((resolve, reject) => {
        let accessedRoutes
        if (roles.includes('admin')) {
          accessedRoutes = asyncRoutes || []
        } else {
          accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
        }
        commit('SET_ROUTES', accessedRoutes)
        resolve(accessedRoutes)
      })
    }
  }
}

export default verify
