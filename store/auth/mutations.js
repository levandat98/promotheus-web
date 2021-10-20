import Vue from 'vue'

/**
 * Auth mutation module's enum
 */
export const authMutations = {
  SET: {
    AUTH: 'auth/SET_AUTH',
  },
  CLEAR: {},
  TOGGLE: {},
  ADD: {},
  REMOVE: {},
  INC: {},
  SUB: {},
}

export default {
  SET_AUTH(state, auth) {
    Vue.set(state, 'data', auth)
    localStorage.setItem('auth', JSON.stringify(auth))
  },
}
