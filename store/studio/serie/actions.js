import qs from 'qs'
import { serieMutations } from './mutations'

export const serieActions = {
  FETCH: {
    DATA: 'studio/serie/fetchData',
    MORE: 'studio/serie/fetchMoreData',
    SINGLE: 'studio/serie/fetchSingle',
  },
  SUBMIT: {
    // MULTIPLE: 'studio/serie/submitMultiple',
    SINGLE: 'studio/serie/submitSingle',
  },
  UPDATE: {
    // MULTIPLE: 'studio/serie/updateMultiple',
    SINGLE: 'studio/serie/updateSingle',
    CHANGE_STATUS: 'studio/serie/changeStatus',
  },
  TOGGLE: {},
  ACTIVATE: {},
  DEACTIVATE: {},
  DELETE: {
    // MULTIPLE: 'studio/serie/deleteMultiple',
    SINGLE: 'studio/serie/deleteSingle',
  },

  UPLOAD: {
    EXCEL: 'studio/serie/uploadExcel',
  },
}

export default {
  async fetchData({ state, commit }) {
    const response = await this.$authApi.get(
      '/series/studio?' + qs.stringify(state.query, { arrayFormat: 'repeat' })
    )
    commit(serieMutations.SET.DATA, response.data.results, { root: true })
    // Fix total later
    commit(serieMutations.SET.TOTAL, response.data.total, {
      root: true,
    })
    return response.data
  },
  async fetchMoreData() {
    const response = await this.$authApi.get('/series')
    return response
  },
  async fetchSingle({ rootState, commit }, id) {
    const response = await this.$authApi.get('/serie/' + id)
    commit(serieMutations.SET.SELECTED, response.series, { root: true })
    return response
  },
  async submitSingle({ rootState }, form) {
    const response = await this.$authApi.post('/series', form)
    return response
  },
  async updateSingle({ rootState }, { id, form }) {
    const response = await this.$authApi.put('/series/' + id, form)
    return response
  },
  async deleteSingle({ rootState }, id) {
    const response = await this.$authApi.delete('/series/' + id)
    return response
  },
}
