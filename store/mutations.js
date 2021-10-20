import Vue from 'vue'

/**
 * Root mutation module's enum
 */
export const rootMutations = {
  SET: {
    LANG: 'SET_LANG',
    INITIAL_STATE: 'SET_INITIAL_STATE',
    SERVER_STATE: 'SET_SERVER_STATE',
    PAGE_TITLE: 'SET_PAGE_TITLE',
  },
  CLEAR: {
    STATE: 'CLEAR_STATE',
  },
  TOGGLE: {
    SIDEBAR_COLLAPSE: 'TOGGLE_SIDEBAR_COLLAPSE',
  },
  ADD: {},
  REMOVE: {},
  INC: {},
  SUB: {},
}

export default {
  // Communicate with Devtools
  SET_LANG(state, locale) {
    if (state.locales.includes(locale)) {
      Vue.set(state, 'locale', locale)
      localStorage.setItem('locale', locale)
    }
  },
  SET_INITIAL_STATE(state, initialState) {
    Vue.set(state, 'initialState', initialState)
    if (localStorage.getItem('sidebarCollapsed')) {
      Vue.set(
        state,
        'sidebarCollapsed',
        localStorage.getItem('sidebarCollapsed') === 'true'
      )
    }
    if (
      localStorage.getItem('locale') &&
      state.locales.includes(localStorage.getItem('locale'))
    ) {
      Vue.set(state, 'locale', localStorage.getItem('locale'))
    }
  },
  SET_SERVER_STATE(state, serverReady) {
    Vue.set(state, 'serverReady', serverReady)
  },
  SET_PAGE_TITLE(state, title) {
    Vue.set(state, 'title', title)
  },
  TOGGLE_SIDEBAR_COLLAPSE(state) {
    state.sidebarCollapsed = !state.sidebarCollapsed
    localStorage.setItem('sidebarCollapsed', state.sidebarCollapsed)
  },
  CLEAR_STATE(state) {
    Object.assign(state, state.initialState)
  },
}
