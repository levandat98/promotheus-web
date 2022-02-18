<template>
  <div class="DetailPage">
    <div class="header flex">
      <div class="logo">
        <img class="logoImg" :src="creator.avatar" alt="" />
      </div>
      <div class="Title relative">
        <div class="absolute bottom-0">
          <span>PODCAST CREATOR</span>
          <div class="font-semibold text-7xl">
            {{ creator.fullName }}
          </div>
        </div>
      </div>
    </div>
    <div class="body pt-6"></div>
  </div>
</template>
<script>
import { config } from './config'
import { mapState } from 'vuex'

export default {
  name: 'Home',
  meta: {
    config,
  },
  components: {},
  layout: 'default',
  middleware: ['auth'],
  async fetch() {
    try {
      const id = this.$route.params.id
      const { data } = await this.$authApi.get(`/creators/${id}`)
      this.creator = data
    } catch (error) {
      return
    }
  },
  data() {
    return {
      episode: {
        type: Array,
        default: [],
      },
      creator: {
        type: Object,
        default: {},
      },
    }
  },
  computed: mapState({
    locale: (state) => state.locale,
  }),
  created() {
    this.$store.commit('SET_PAGE_TITLE', 'Dashboard')
  },

  head() {
    return {
      title: this.$t('home.title'),
    }
  },
}
</script>
<style lang="scss" scoped>
.DetailPage {
  width: 100vw;
  background-color: linear-gradient(
    rgba(209, 213, 219, var(--tw-text-opacity)),
    rgb(75, 85, 99) 75%
  );
  padding-top: 16px;
  .header {
    padding-left: 24px;
    padding-right: 24px;
    height: 260px;
    .Title {
      width: 100%;
      min-width: 900px;
      padding-left: 24px;
    }
  }
  .body {
    padding-left: 24px;
    padding-right: 24px;
  }

  .logo {
    height: 232px;
    min-width: 232px;
    width: 232px;
    padding-right: 10px;
    margin-top: 32px;
    .logoImg {
      border-radius: 10px;
    }
  }
  .icon {
    color: rgb(226, 232, 240);
    :hover {
      color: rgb(255, 255, 255);
      cursor: pointer;
    }
  }
}
</style>
