<template>
  <h1>hihihihi</h1>
</template>
<script>
import { mapState } from 'vuex'
import { config } from './config'
import { authActions } from '~/store/auth/actions'
export default {
  name: 'Home',
  meta: {
    config,
  },
  layout: 'unauth',
  middleware: ['auth'],
  components: {},
  data() {
    return {
      file: null,
    }
  },
  computed: mapState({
    locale: (state) => state.locale,
  }),
  created() {
    this.$store.commit('SET_PAGE_TITLE', 'Dashboard')
  },
  methods: {
    async logout() {
      await this.$store.dispatch(authActions.LOGOUT)
      this.$router.push('/')
    },
  },
  head() {
    return {
      title: this.$t('home.title'),
    }
  },
}
</script>
