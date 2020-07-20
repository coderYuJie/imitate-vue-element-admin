const setting = {
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
