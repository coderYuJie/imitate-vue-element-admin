const setting = {
  namespaced: true,
  state: () => ({
    locale: 'zh'
  }),
  mutations: {
    SET_LOCALE (state, payload) {
      state.locale = payload
    }
  },
  actions: {

  }
}

export default setting
