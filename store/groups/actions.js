import qs from 'qs'
import { groupMutations } from './mutations'

export const groupActions = {
  FETCH: {
    DATA: 'groups/fetchData',
    MORE: 'groups/fetchMoreData',
    SINGLE: 'groups/fetchSingle',
  },
  SUBMIT: {
    // MULTIPLE: 'groups/submitMultiple',
    SINGLE: 'groups/submitSingle',
  },
  UPDATE: {
    // MULTIPLE: 'groups/updateMultiple',
    SINGLE: 'groups/updateSingle',
  },
  TOGGLE: {},
  ACTIVATE: {},
  DEACTIVATE: {},
  DELETE: {
    // MULTIPLE: 'groups/deleteMultiple',
    SINGLE: 'groups/deleteSingle',
  },
  UPLOAD: {
    EXCEL: 'groups/uploadExcel',
  },
}

export default {
  async fetchData({ state, commit }) {
    const response = await this.$authApi.get('group-tags/groups')
    commit(groupMutations.SET.DATA, response.data.content, { root: true })
    return response.data
  },
}
