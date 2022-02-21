export default {
  getCurrentTrack(state) {
    return state.users.currentTrack || {}
  },
  getQueue(state) {
    return state.users.queue || []
  },
}
