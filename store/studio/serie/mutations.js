import Vue from 'vue'

export const serieMutations = {
  SET: {
    DATA: 'studio/serie/SET_DATA',
    TOTAL: 'studio/serie/SET_TOTAL',
    QUERY: 'studio/serie/SET_QUERY',
    SELECTED: 'studio/serie/SET_SELECTED',
  },
  CLEAR: {
    QUERY: 'studio/serie/CLEAR_QUERY',
  },
  TOGGLE: {},
  ADD: {
    DATA: 'studio/serie/ADD_DATA',
  },
  REMOVE: {},
  INC: {
    QUERY_PAGE: 'studio/serie/INC_QUERY_PAGE',
  },
  SUB: {
    QUERY_PAGE: 'studio/serie/SUB_QUERY_PAGE',
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
    Vue.set(state, 'selected', { ...selected })
  },
  ADD_DATA(state, data) {
    Vue.set(state, 'data', [...state.data, ...data])
  },
  CLEAR_QUERY(state) {
    Vue.set(state, 'query', {
      offset: 0,
      limit: 10,
    })
  },
  INC_QUERY_OFFSET(state) {
    Vue.set(state.query, 'offset', state.query.offset + state.query.limit)
  },
  SUB_QUERY_OFFSET(state) {
    Vue.set(state.query, 'offset', state.query.offset - state.query.limit)
  },
}
