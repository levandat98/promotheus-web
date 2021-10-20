import Vue from 'vue'

export const exampleMutations = {
  SET: {
    DATA: 'example/SET_DATA',
    TOTAL: 'example/SET_TOTAL',
    QUERY: 'example/SET_QUERY',
  },
  CLEAR: {
    QUERY: 'example/CLEAR_QUERY',
  },
  TOGGLE: {},
  ADD: {
    DATA: 'example/ADD_DATA',
  },
  REMOVE: {},
  INC: {
    QUERY_PAGE: 'example/INC_QUERY_OFFSET',
  },
  SUB: {
    QUERY_PAGE: 'example/SUB_QUERY_OFFSET',
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
