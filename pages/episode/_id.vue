<template>
  <div>
    <h1>
      {{ episode.title }}
    </h1>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { config } from './config'
import { userActions } from '~/store/episode/actions'
export default {
  name: 'EpisodeDetail',
  meta: {
    config,
  },
  components: {},
  layout: 'default',
  middleware: ['auth'],
  async fetch() {},
  data() {
    return {
      episode: {
        type: Object,
        default: {},
      },
    }
  },
  computed: mapState({
    locale: (state) => state.locale,
  }),
  created() {
    this.$store.commit('SET_PAGE_TITLE', 'Episode')
  },
  head() {
    return {
      title: this.$t('home.title'),
    }
  },
}
</script>
