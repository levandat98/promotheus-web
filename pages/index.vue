<template>
  <div><Genre v-for="item in items" :key="item.id" /></div>
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
  data() {
    const items = []
    for (let i = 1; i < 6; i++) {
      items.push({
        gerne: 'Your Episode',
        id: i,
      })
    }
    return {
      items,
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
