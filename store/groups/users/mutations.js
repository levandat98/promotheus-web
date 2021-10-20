import Vue from 'vue'

export const userMutations = {
  SET: {
    DATA: 'users/SET_DATA',
    TOTAL: 'users/SET_TOTAL',
    QUERY: 'users/SET_QUERY',
    SELECTED: 'users/SET_SELECTED',
  },
  CLEAR: {
    QUERY: 'users/CLEAR_QUERY',
  },
  TOGGLE: {},
  ADD: {
    DATA: 'users/ADD_DATA',
  },
  REMOVE: {},
  INC: {
    QUERY_PAGE: 'users/INC_QUERY_PAGE',
  },
  SUB: {
    QUERY_PAGE: 'users/SUB_QUERY_PAGE',
  },
}

export default {
  SET_DATA(state, data) {
    Vue.set(state, 'data', data)
  },
  SET_TOTAL(state, total) {
    Vue.set(state, 'total', total)
  },
  SET_QUERY(state, query) {
    Vue.set(state, 'query', { ...state.query, ...query })
  },
  SET_SELECTED(state, selected) {
    Vue.set(state, 'selected', selected)
  },
  ADD_DATA(state, data) {
    Vue.set(state, 'data', [...state.data, ...data])
  },
  CLEAR_QUERY(state) {
    Vue.set(state, 'query', {
      page: 1,
      size: 10,
    })
  },
  INC_QUERY_PAGE(state) {
    Vue.set(state.query, 'page', state.query.page + 1)
  },
  SUB_QUERY_OFFSET(state) {
    Vue.set(state.query, 'page', state.query.page - 1)
  },
}
