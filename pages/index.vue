<template>
  <div><Genre /></div>
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
  layout: 'user',
  middleware: ['auth'],
  data() {
    const items = []
    for (let i = 1; i < 10; i++) {
      items.push({
        img: 'https://picsum.photos/500/300',
        id: i,
        name: 'ahuhuhuhu',
        releaseDate: '21-01-1998',
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
