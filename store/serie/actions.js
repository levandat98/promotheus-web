import qs from 'qs'
import { serieMutations } from './mutations'

export const serieActions = {
  FETCH: {
    DATA: 'serie/fetchData',
    MORE: 'serie/fetchMoreData',
    SINGLE: 'serie/fetchSingle',
  },
  SUBMIT: {
    // MULTIPLE: 'serie/submitMultiple',
    SINGLE: 'serie/submitSingle',
  },
  UPDATE: {
    // MULTIPLE: 'serie/updateMultiple',
    SINGLE: 'serie/updateSingle',
    CHANGE_STATUS: 'serie/changeStatus',
  },
  TOGGLE: {},
  ACTIVATE: {},
  DEACTIVATE: {},
  DELETE: {
    // MULTIPLE: 'serie/deleteMultiple',
    SINGLE: 'serie/deleteSingle',
  },

  UPLOAD: {
    EXCEL: 'serie/uploadExcel',
  },
}

export default {
  async fetchData({ state, commit }) {
    const response = await this.$authApi.get(
      '/series?' + qs.stringify(state.query, { arrayFormat: 'repeat' })
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
