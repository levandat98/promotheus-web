import Vue from 'vue'

export const episodeMutations = {
  SET: {
    DATA: 'episode/SET_DATA',
    TOTAL: 'episode/SET_TOTAL',
    QUERY: 'episode/SET_QUERY',
    SELECTED: 'episode/SET_SELECTED',
  },
  CLEAR: {
    QUERY: 'episode/CLEAR_QUERY',
  },
  TOGGLE: {},
  ADD: {
    DATA: 'episode/ADD_DATA',
  },
  REMOVE: {},
  INC: {
    QUERY_PAGE: 'episode/INC_QUERY_PAGE',
  },
  SUB: {
    QUERY_PAGE: 'episode/SUB_QUERY_PAGE',
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
