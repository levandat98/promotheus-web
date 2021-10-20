import qs from 'qs'
import { userMutations } from './mutations'

export const userActions = {
  FETCH: {
    DATA: 'users/fetchData',
    MORE: 'users/fetchMoreData',
    SINGLE: 'users/fetchSingle',
  },
  SUBMIT: {
    // MULTIPLE: 'users/submitMultiple',
    SINGLE: 'users/submitSingle',
  },
  UPDATE: {
    // MULTIPLE: 'users/updateMultiple',
    SINGLE: 'users/updateSingle',
    CHANGE_STATUS: 'users/changeStatus',
  },
  TOGGLE: {},
  ACTIVATE: {},
  DEACTIVATE: {},
  DELETE: {
    // MULTIPLE: 'users/deleteMultiple',
    SINGLE: 'users/deleteSingle',
  },

  UPLOAD: {
    EXCEL: 'users/uploadExcel',
  },
}

export default {
  async fetchData({ state, commit }) {
    // console.log('[state.query]', state.query)
    // let filters = ``
    // let response = null
    // if (state.query.filter) {
    //   filters = await String(state.query.filter)
    //   console.log('[filters HERE]', filters)
    //   delete state.query.filter
    //   response = await this.$authApi.get(
    //     'users?' +
    //       qs.stringify(state.query, { arrayFormat: 'repeat' }) +
    //       `&filter=${filters}`
    //   )
    // } else
    //   response = await this.$authApi.get(
    //     'users?' + qs.stringify(state.query, { arrayFormat: 'repeat' })
    //   )
    // const response = await this.$authApi.get(
    //   'users?' +
    //     'page=1&size=10&offset=0?' +
    //     'filter:' +
    //     JSON.stringify(state.query.filter)
    // )
    const response = await this.$authApi.get(
      'users?' + qs.stringify(state.query, { arrayFormat: 'repeat' })
    )
    commit(userMutations.SET.DATA, response.data.content, { root: true })
    // Fix total later
    commit(userMutations.SET.TOTAL, response.data.meta?.totalRecord, {
      root: true,
    })
    return response.data
  },
  async fetchMoreData() {
    const response = await this.$authApi.get('/user')
    return response
  },
  async fetchSingle({ rootState, commit }, id) {
    const response = await this.$authApi.get('/users/' + id)
    commit(userMutations.SET.SELECTED, response.data, { root: true })
    return response
  },
  async submitSingle({ rootState }, form) {
    const response = await this.$authApi.post('/user', form)
    return response
  },
  async updateSingle({ rootState }, { id, form }) {
    const response = await this.$authApi.patch('/users/' + id, form)
    return response
  },
  async deleteSingle({ rootState }, id) {
    const response = await this.$authApi.delete('/users/' + id)
    return response
  },
  async uploadExcel({ rootState }, formData) {
    const response = await this.$authApi.post('/excels/users/', formData)
    return response
  },
  async changeStatus({ rootState }, { id, body }) {
    const response = await this.$authApi.patch('/users/' + id, body)
    return response
  },
}
