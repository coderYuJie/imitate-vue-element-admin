import { getToken, setToken } from '@/utils/auth'
import { login } from '@/api/user'

const user = {
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
    login ({ commit }, payload) {
      const { username, password } = payload
      return new Promise((resolve, reject) => {
        login({ username, password }).then(res => {
          commit('SET_TOKEN', res.data.token)
          setToken(res.data.token)
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    }
  },
  getters: {}
}
export default user
