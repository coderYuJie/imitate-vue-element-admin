import SvgIcon from './svgIcon.vue'
import Vue from 'vue'
// 引入svg
// import '../../assets/svg/language.svg'
// 自动引入全部的svg
const requireAll = requireContext => requireContext.keys().map(requireContext)
const req = require.context('@/assets/svg', true, /\.svg$/)
requireAll(req)

Vue.component('svg-icon', SvgIcon)
