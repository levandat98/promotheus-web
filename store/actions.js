import { authMutations } from './auth/mutations'
import { rootMutations } from './mutations'

const cookieparser = process.server ? require('cookieparser') : undefined
export const rootActions = {
  NUXT_SERVER_INIT: 'nuxtServerInit',
  RESET_STATE: 'resetState',
}
export default {
  // This will run first when nuxt app init
  // Called manually in middleware in SPA mode
  /**
   * Run as a middleware, used in nuxt.config.js as the first global middleware
   * therefore, this action will run first
   * @param {Object} context Vuex default action's first parameter
   * @returns {void} Return nothing
   */
  // nuxtServerInit({ commit }, { req }) {
  //   let auth = null
  //   // Since we don't have localStorage in server side, we gotta use cookie instead
  //   if (req.headers.cookie) {
  //     const parsed = cookieparser.parse(req.headers.cookie)
  //     try {
  //       auth = JSON.parse(parsed.auth)
  //     } catch (err) {
  //       // No valid cookie found
  //       this.$dev.error(err)
  //     }
  //   }
  //   commit(authMutations.SET.AUTH, auth)
  //   commit(rootMutations.SET.SERVER_STATE, true) // Server is ready
  // },
  nuxtServerInit({ commit, state }) {
    let auth = null
    commit(rootMutations.SET.INITIAL_STATE, JSON.parse(JSON.stringify(state)))
    const authString = localStorage.getItem('auth')
    if (authString) {
      auth = JSON.parse(authString)
      commit(authMutations.SET.AUTH, auth)
    }
    commit(rootMutations.SET.SERVER_STATE, true) // Server is ready
  },
}
