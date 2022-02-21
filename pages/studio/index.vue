<template>
  <div>hihi</div>
</template>
<script>
import { mapState } from 'vuex'
import { config } from './config'

export default {
  name: 'SerieDetail',
  meta: {
    config,
  },
  components: {},
  layout: 'studio',
  middleware: ['auth'],
  async fetch() {},
  data() {
    return {}
  },
  computed: mapState({
    locale: (state) => state.locale,
  }),
  head() {
    return {
      title: this.$t('home.title'),
    }
  },
}
</script>
<style lang="scss" scoped></style>
