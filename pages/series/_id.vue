<template>
  <div class="DetailPage">
    <div class="header flex">
      <div class="logo">
        <img class="logoImg" :src="serie.img" alt="" />
      </div>
      <div class="Title relative">
        <div class="absolute bottom-0">
          <span class="text-sm">PODCAST SERIE</span>
          <div
            class="font-semibold"
            :class="[serieName > 30 ? 'text-5xl' : 'text-7xl']"
          >
            {{ serie.name }}
          </div>
          <NuxtLink
            :to="`/creator/${creator.id}`"
            class="hover:underline cursor-pointer text-3xl"
          >
            {{ creator.fullName }}
          </NuxtLink>
        </div>
      </div>
    </div>
    <div class="body pt-6 pb-6">
      <div class="playerBar pt-2 pb-2 items-center">
        <fa
          :class="serie.id === currentSerieId ? 'text-blue' : 'text-gray-100'"
          :icon="['fas', 'play-circle']"
          class="text-5xl icon"
          @click="playSerie"
        />

        <fa
          :icon="['fas', 'plus']"
          class="
            text-3xl text-gray-100
            font-medium
            absolute
            mt-2.5
            ml-6
            icon
            text-slate-200
          "
          @click="addToQueue"
        />
        <fa
          :icon="['fas', 'ellipsis-h']"
          class="
            text-3xl text-gray-100
            font-medium
            absolute
            mt-2.5
            ml-20
            icon
            text-slate-200
          "
        />
      </div>
      <div class="description pt-2 pb-2 w-2/3">
        <div class="text-2xl">Serie Description</div>
        <h1 class="pt-4">
          {{ serie.description }}
        </h1>
      </div>
    </div>
    <div class="p-6">
      <EpisodeItem
        v-for="episode in serie.episodes"
        :key="episode"
        :episode="episode"
      />
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { config } from './config'
import { userActions } from '~/store/episode/actions'
import { userMutations } from '~/store/users/mutations'
import moment from 'moment'
import { Message } from 'element-ui'
import { EpisodeItem } from '~/components/uncommon/Episode'

export default {
  name: 'SerieDetail',
  meta: {
    config,
  },
  components: { EpisodeItem },
  layout: 'default',
  middleware: ['auth'],
  async fetch() {
    try {
      const id = this.$route.params.id
      const { data } = await this.$authApi.get(`/series/${id}`)
      this.serie = data
      this.serieName = data.name
      this.creator = data.creator
    } catch (error) {
      return
    }
  },
  data() {
    return {
      serie: {
        type: Object,
        default: {},
      },
      creator: {
        type: Object,
        default: {},
      },
      serieName: '',
    }
  },
  computed: mapState({
    locale: (state) => state.locale,
    dateFormat() {
      return moment(this.serie.releaseDate).format('DD MMMM YY')
    },
    isPlay: (state) => state.users.isPlay || false,
    currentSerieId: (state) => state.users.currentSerieId || 0,
    currentTrack: (state) =>
      state.users.currentTrack || state.users.queue[0] || {},
  }),
  created() {
    this.$store.commit('SET_PAGE_TITLE', 'Serie')
  },
  methods: {
    playSerie() {
      this.$store.commit(userMutations.SET.QUEUE, this.serie.episodes, {
        root: true,
      })
      this.$store.commit(
        userMutations.SET.SET_CURRENT_TRACK,
        this.serie.episodes[0],
        {
          root: true,
        }
      )
      this.$store.commit(userMutations.SET.SET_SERIE, this.serie.id, {
        root: true,
      })
      this.$store.commit(userMutations.SET.SET_PLAY, true, {
        root: true,
      })
    },
    pauseSerie() {
      this.$store.commit(userMutations.SET.SET_PLAY, false, {
        root: true,
      })
    },
    async addToQueue() {
      const id = this.$route.params.id
      const { data } = await this.$authApi.post(`/users/queue/${id}`)
      console.log(data)
      if (data) {
        this.$store.commit(userMutations.SET.PUSH_TO_QUEUE, this.episode, {
          root: true,
        })
        Message.success('Added to queue')
      }
    },
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

  padding-top: 16px;
  .header {
    background: linear-gradient(transparent 0, rgba(0, 0, 0, 0.5) 100%),
      var(--background-noise);
    padding-left: 24px;
    padding-right: 24px;
    padding-bottom: 32px;
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
    .logoImg {
      border-radius: 10px;
    }
  }
  .icon {
    color: rgb(226, 232, 240);
    :hover {
      cursor: pointer;
    }
  }
}
</style>
