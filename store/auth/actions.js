import { authMutations } from './mutations'
const Cookie = process.client ? require('js-cookie') : undefined

/**
 * Auth action module's enum
 */
export const authActions = {
  LOGIN: 'auth/login',
  LOGOUT: 'auth/logout',
  SIGNUP: 'auth/signUp',
}

export default {
  /**
   * Login action
   * @param {Object} context Vuex default action's first parameter
   * @param {Object} form Get from login form
   * @param {String} form.email
   * @param {String} form.password
   * @returns {void} Return nothing
   */
  async login({ commit }, form) {
    const { data } = await this.$clientApi.post('/auth/login', form)
    commit(authMutations.SET.AUTH, data, { root: true }) // Mutating to store for client rendering
    return data
  },
  /**
   * Logout action
   * @param {Object} context Vuex default action's first parameter
   * @returns {void} Return nothing
   */
  logout({ commit }) {
    localStorage.removeItem('auth')
    commit(authMutations.SET.AUTH, null, { root: true })
  },
  async signUp(form) {
    const { data } = await this.$clientApi.post('/auth/sign-up', form)
    return data
  },
}
