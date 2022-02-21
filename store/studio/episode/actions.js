import qs from 'qs'
import { episodeMutations } from './mutations'

export const episodeActions = {
  FETCH: {
    DATA: 'studio/episode/fetchData',
    MORE: 'studio/episode/fetchMoreData',
    SINGLE: 'studio/episode/fetchSingle',
  },
  SUBMIT: {
    // MULTIPLE: 'episode/submitMultiple',
    SINGLE: 'studio/episode/submitSingle',
  },
  UPDATE: {
    // MULTIPLE: 'episode/updateMultiple',
    SINGLE: 'studio/episode/updateSingle',
    CHANGE_STATUS: 'studio/episode/changeStatus',
  },
  TOGGLE: {},
  ACTIVATE: {},
  DEACTIVATE: {},
  DELETE: {
    // MULTIPLE: 'episode/deleteMultiple',
    SINGLE: 'studio/episode/deleteSingle',
  },

  UPLOAD: {
    EXCEL: 'studio/episode/uploadExcel',
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
    console.log('/.......................')
    const response = await this.$authApi.get(
      'episodes/studio?' + qs.stringify(state.query, { arrayFormat: 'repeat' })
    )
    commit(episodeMutations.SET.DATA, response.data.results, { root: true })
    // Fix total later
    commit(episodeMutations.SET.TOTAL, response.data?.total, {
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
    commit(episodeMutations.SET.SELECTED, response.data, { root: true })
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
