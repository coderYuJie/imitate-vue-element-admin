import Vue from 'vue'
import VueI18n from 'vue-i18n'
import store from '@/store/index'
import elementZhLocale from 'element-ui/lib/locale/lang/zh-CN'
import elementEnLocale from 'element-ui/lib/locale/lang/en'

import zhLocale from './zh'
import enLocale from './en'

Vue.use(VueI18n)

const messages = {
  zh: {
    ...zhLocale,
    ...elementZhLocale
  },
  en: {
    ...enLocale,
    ...elementEnLocale
  }
}
const i18n = new VueI18n({
  locale: store.state.setting.locale,
  messages
})

export default i18n
