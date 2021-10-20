import qs from 'qs'
import { exampleMutations } from './mutations'

export const exampleActions = {
  FETCH: {
    DATA: 'example/fetchData',
    MORE: 'example/fetchMoreData',
    SINGLE: 'example/fetchSingle',
  },
  SUBMIT: {
    // MULTIPLE: 'example/submitMultiple',
    SINGLE: 'example/submitSingle',
  },
  UPDATE: {
    // MULTIPLE: 'example/updateMultiple',
    SINGLE: 'example/updateSingle',
  },
  TOGGLE: {},
  ACTIVATE: {},
  DEACTIVATE: {},
  DELETE: {
    // MULTIPLE: 'example/deleteMultiple',
    SINGLE: 'example/deleteSingle',
  },
}

export default {
  async fetchData({ state, commit }) {
    const response = await this.$authApi.get(
      'example?' + qs.stringify(state.query, { arrayFormat: 'repeat' })
    )
    commit(exampleMutations.SET.DATA, response.data.results, { root: true })
    // Fix total later
    commit(exampleMutations.SET.TOTAL, response.data.total, { root: true })
    return response.data
  },
  async fetchMoreData() {
    const response = await this.$authApi.get('/example')
    return response
  },
  async fetchSingle({ rootState }, id) {
    const response = await this.$authApi.get('/example/' + id)
    return response
  },
  async submitSingle({ rootState }, form) {
    const response = await this.$authApi.post('/example', form)
    return response
  },
  async updateSingle({ rootState }, { id, form }) {
    const response = await this.$authApi.put('/example/' + id, form)
    return response
  },
  async deleteSingle({ rootState }, id) {
    const response = await this.$authApi.delete('/example/' + id)
    return response
  },
}
