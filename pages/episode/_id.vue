<template>
  <div class="DetailPage">
    <div class="header flex">
      <div class="logo">
        <img class="logoImg" :src="episode.img" alt="" />
      </div>
      <div class="Title relative">
        <div class="absolute bottom-0">
          <span>PODCAST EPISODE</span>
          <div
            class="font-semibold"
            :class="[episodeName.length > 30 ? 'text-5xl' : 'text-7xl']"
          >
            {{ episode.name }}
          </div>
          <div class="hover:underline cursor-pointer text-3xl">
            {{ creator.fullName }}
          </div>
        </div>
      </div>
    </div>
    <div class="body pt-6">
      <div class="time pt-4 pb-2">
        <span>{{ dateFormat }} · {{ audioLengthFormat }}</span>
      </div>
      <div class="playerBar pt-2 pb-2 items-center">
        <fa
          v-if="!isPlay"
          :icon="['fas', 'play-circle']"
          class="text-5xl text-gray-100 icon"
          @click="playTrack"
        />
        <fa
          v-if="isPlay"
          :icon="['fas', 'pause-circle']"
          class="text-5xl text-gray-100 icon"
          @click="pauseTrack"
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
        <h1>
          {{ episode.description }}
        </h1>
      </div>
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

export default {
  name: 'EpisodeDetail',
  meta: {
    config,
  },
  components: {},
  layout: 'default',
  middleware: ['auth'],
  async fetch() {
    try {
      const id = this.$route.params.id
      const { data } = await this.$authApi.get(`/episodes/${id}`)
      this.episode = data
      this.episodeName = data.name
      this.creator = data.creator
    } catch (error) {
      return
    }
  },
  data() {
    return {
      episode: {
        type: Object,
        default: {},
      },
      creator: {
        type: Object,
        default: {},
      },
      episodeName: '',
      isPlay: false,
    }
  },
  computed: mapState({
    locale: (state) => state.locale,
    dateFormat() {
      return moment(this.episode.releaseDate).format('DD MMMM YY')
    },
    audioLengthFormat() {
      let time = this.episode.audioLength
      if (time >= 60 && time <= 3600) {
        let minutes = Math.floor(time / 60)
        let seconds = time - minutes * 60
        return `${minutes >= 10 ? minutes : ' 0' + minutes.toString()} min ${
          seconds >= 10 ? seconds : ' 0' + seconds.toString()
        } sec`
      } else if (time >= 3600) {
        let hours = Math.floor(time / 3600)
        let minutes = Math.floor(time / 60)
        let seconds = time - minutes * 60
        return `${hours >= 10 ? hours : ' 0' + hours.toString()} hour ${
          minutes >= 10 ? minutes : ' 0' + minutes.toString()
        }:${seconds >= 10 ? seconds : ' 0' + seconds.toString()} min`
      } else {
        return `${time} sec`
      }
    },
  }),
  created() {
    this.$store.commit('SET_PAGE_TITLE', 'Episode')
  },
  methods: {
    playTrack() {
      this.$store.commit(userMutations.SET.SET_CURRENT_TRACK, this.episode, {
        root: true,
      })
      this.$store.commit(userMutations.SET.QUEUE, [this.episode], {
        root: true,
      })
      this.isPlay = true
      this.$bus.$emit('play-track')
    },
    pauseTrack() {
      this.$bus.$emit('play-track')
      this.isPlay = false
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
