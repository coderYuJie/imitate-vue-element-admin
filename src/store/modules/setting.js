import { getSize, setSize } from '@/utils/size'
import settingDefault from '@/setting'
const setting = {
  namespaced: true,
  state: () => ({
    locale: 'zh',
    size: getSize() || 'medium',
    tagsView: settingDefault.tagsView,
    headerFixed: settingDefault.headerFixed,
    logo: settingDefault.logo,
    pinyin: settingDefault.pinyin
  }),
  mutations: {
    SET_LOCALE (state, payload) {
      state.locale = payload
    },
    SET_SIZE (state, payload) {
      state.size = payload
      setSize(payload)
    },
    CHANGE_TAGS_VIEW (state, val) {
      state.tagsView = val
    },
    CHANGE_HEADER_FIXED (state, val) {
      state.headerFixed = val
    },
    CHANGE_LOGO (state, val) {
      state.logo = val
    },
    CHANGE_PINYIN (state, val) {
      state.pinyin = val
    }
  },
  actions: {
    setLocale ({ commit }, lang) {
      commit('SET_LOCALE', lang)
    },
    setSize ({ commit }, size) {
      commit('SET_SIZE', size)
    },
    changeTagsView ({ commit }, val) {
      commit('CHANGE_TAGS_VIEW', val)
    },
    changeHeaderFixed ({ commit }, val) {
      commit('CHANGE_HEADER_FIXED', val)
    },
    changeLogo ({ commit }, val) {
      commit('CHANGE_LOGO', val)
    },
    changePinyin ({ commit }, val) {
      commit('CHANGE_PINYIN', val)
    }
  }
}

export default setting
