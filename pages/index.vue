<template>
  <div><Genre v-for="item in items" :key="item.genre" :gerne="item" /></div>
</template>
<script>
import { mapState } from 'vuex'
import { config } from './config'
import { Genre } from '~/components/uncommon/Genre'
import { authActions } from '~/store/auth/actions'
export default {
  name: 'Home',
  meta: {
    config,
  },
  components: {
    Genre,
  },
  layout: 'default',
  middleware: ['auth'],
  async fetch() {
    const { data } = await this.$authApi.get('/episodes/home')
    this.items = data.results
  },
  data() {
    return {
      items: {
        type: Array,
        default: [],
      },
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
