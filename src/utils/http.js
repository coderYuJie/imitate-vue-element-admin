import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '../store'
import { getToken, removeToken } from './auth'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 1000 * 6
})

// 添加请求拦截器
service.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  if (store.state.user.token) {
    config.headers['X-Token'] = getToken()
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
service.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  const res = response.data

  if (res.code === '0002') {
    MessageBox.confirm('登录过期，请重新登录！', '提示', {
      confirmButtonText: '去登陆',
      cancelButtonText: '取消'
    }).then(() => {
      removeToken()
      location.reload()
    })
  } else if (res.code !== '0000') {
    Message.error(res.message || 'error')
  }
  return res
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error)
})

export default service
