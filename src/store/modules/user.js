import { getToken } from '../../utils/auth'

const user = {
  state: () => ({
    token: getToken()
  }),
  mutations: { },
  actions: { },
  getters: {}
}
export default user
