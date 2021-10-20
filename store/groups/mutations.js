import Vue from 'vue'

export const groupMutations = {
  SET: {
    DATA: 'groups/SET_DATA',
    TOTAL: 'groups/SET_TOTAL',
    QUERY: 'groups/SET_QUERY',
    SELECTED: 'groups/SET_SELECTED',
    VIEWING_GROUP: 'groups/SET_VIEWING',
  },
  CLEAR: {
    QUERY: 'groups/CLEAR_QUERY',
  },
  TOGGLE: {},
  ADD: {
    DATA: 'groups/ADD_DATA',
  },
  REMOVE: {},
  INC: {
    QUERY_PAGE: 'groups/INC_QUERY_PAGE',
  },
  SUB: {
    QUERY_PAGE: 'groups/SUB_QUERY_PAGE',
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
  SET_VIEWING(state, viewing) {
    console.log('[viewing]', viewing)
    Vue.set(state, 'viewing', viewing)
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
