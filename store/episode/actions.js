import qs from 'qs'
import { userMutations } from './mutations'

export const userActions = {
  FETCH: {
    DATA: 'episode/fetchData',
    MORE: 'episode/fetchMoreData',
    SINGLE: 'episode/fetchSingle',
  },
  SUBMIT: {
    // MULTIPLE: 'episode/submitMultiple',
    SINGLE: 'episode/submitSingle',
  },
  UPDATE: {
    // MULTIPLE: 'episode/updateMultiple',
    SINGLE: 'episode/updateSingle',
    CHANGE_STATUS: 'episode/changeStatus',
  },
  TOGGLE: {},
  ACTIVATE: {},
  DEACTIVATE: {},
  DELETE: {
    // MULTIPLE: 'episode/deleteMultiple',
    SINGLE: 'episode/deleteSingle',
  },

  UPLOAD: {
    EXCEL: 'episode/uploadExcel',
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
    //     'episode?' +
    //       qs.stringify(state.query, { arrayFormat: 'repeat' }) +
    //       `&filter=${filters}`
    //   )
    // } else
    //   response = await this.$authApi.get(
    //     'episode?' + qs.stringify(state.query, { arrayFormat: 'repeat' })
    //   )
    // const response = await this.$authApi.get(
    //   'episode?' +
    //     'page=1&size=10&offset=0?' +
    //     'filter:' +
    //     JSON.stringify(state.query.filter)
    // )
    const response = await this.$authApi.get(
      'episode?' + qs.stringify(state.query, { arrayFormat: 'repeat' })
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
    const response = await this.$authApi.get('/episode/' + id)
    commit(userMutations.SET.SELECTED, response.data, { root: true })
    return response
  },
  async submitSingle({ rootState }, form) {
    const response = await this.$authApi.post('/user', form)
    return response
  },
  async updateSingle({ rootState }, { id, form }) {
    const response = await this.$authApi.patch('/episode/' + id, form)
    return response
  },
  async deleteSingle({ rootState }, id) {
    const response = await this.$authApi.delete('/episode/' + id)
    return response
  },
}
