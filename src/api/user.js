import _axios from '../utils/http'

export function login (payload = {}) {
  return _axios.post('/login', payload)
}
export function userInfo () {
  return _axios.get('/getInfo')
}
