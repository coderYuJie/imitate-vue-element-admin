import { getToken, setToken } from '@/utils/auth'
import { login, userInfo } from '@/api/user'

const user = {
  namespaced: true,
  state: () => ({
    token: getToken(),
    name: '',
    avatar: '',
    introduction: '',
    roles: []
  }),
  mutations: {
    SET_TOKEN (state, token) {
      state.token = token
    },
    SET_ROLES (state, roles) {
      state.roles = roles
    },
    SET_NAME (state, name) {
      state.name = name
    },
    SET_AVATAR (state, avatar) {
      state.avatar = avatar
    },
    SET_INTRODUCTION (state, introduction) {
      state.introduction = introduction
    }
  },
  actions: {
    // user login
    login ({ commit }, payload) {
      const { username, password } = payload
      return new Promise((resolve, reject) => {
        login({ username, password }).then(res => {
          commit('SET_TOKEN', res.data.token)
          setToken(res.data.token)
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    // get user info
    getInfo ({ commit }, state) {
      return new Promise((resolve, reject) => {
        userInfo().then(res => {
          const { data } = res
          const { roles, name, avatar, introduction } = data
          commit('SET_ROLES', roles)
          commit('SET_NAME', name)
          commit('SET_AVATAR', avatar)
          commit('SET_INTRODUCTION', introduction)
          resolve(data)
        })
      })
    }
  },
  getters: {}
}
export default user
