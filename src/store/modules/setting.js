import { getSize, setSize } from '@/utils/size'
const setting = {
  namespaced: true,
  state: () => ({
    locale: 'zh',
    size: getSize() || 'medium'
  }),
  mutations: {
    SET_LOCALE (state, payload) {
      state.locale = payload
    },
    SET_SIZE (state, payload) {
      state.size = payload
      setSize(payload)
    }
  },
  actions: {
    setLocale ({ commit }, lang) {
      commit('SET_LOCALE', lang)
    },
    setSize ({ commit }, size) {
      commit('SET_SIZE', size)
    }
  }
}

export default setting
