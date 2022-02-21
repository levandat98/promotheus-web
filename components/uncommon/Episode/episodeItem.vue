<template>
  <NuxtLink :to="`/episode/${episode.id}`">
    <hr class="episodeDetailBreak" />
    <div class="flex hover:bg-gray-600 p-4 rounded-md cursor-pointer">
      <div class="avatar">
        <img class="logoEpisodeImg rounded-md" :src="episode.img" alt="" />
      </div>
      <div class="episodeContent pl-6 pt-1">
        <div class="font-semibold episodeName">{{ episode.name }}</div>
        <div class="text-sm pt-1">{{ description(episode.description) }}</div>
        <div class="flex pt-1">
          <fa
            v-if="!isPlay || currentTrack.id !== episode.id"
            :icon="['fas', 'play-circle']"
            class="text-4xl text-gray-100 icon"
            @click="playTrack"
          />
          <fa
            v-if="isPlay && currentTrack.id === episode.id"
            :icon="['fas', 'pause-circle']"
            class="text-4xl text-gray-100 icon"
            @click="pauseTrack"
          />
          <div class="pl-3 pt-2">
            {{ formatDay(episode.releaseDate) }} -
            {{ audioLengthFormat(episode.audioLength) }}
          </div>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>
<script>
import moment from 'moment'
import { userMutations } from '~/store/users/mutations'
import { mapState } from 'vuex'

export default {
  name: 'EpisodeItem',
  props: {
    episode: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  computed: mapState({
    locale: (state) => state.locale,

    isPlay: (state) => state.users.isPlay || false,
    currentTrack: (state) =>
      state.users.currentTrack || state.users.queue[0] || {},
  }),

  methods: {
    audioLengthFormat(time) {
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
    formatDay(date) {
      return moment(date).format('MMM YY')
    },
    description(description) {
      return description?.length > 200
        ? description?.substring(0, 200) + '...'
        : description
    },
    playTrack() {
      this.$store.commit(userMutations.SET.SET_CURRENT_TRACK, this.episode, {
        root: true,
      })
      this.$store.commit(userMutations.SET.QUEUE, [this.episode], {
        root: true,
      })
      this.$store.commit(userMutations.SET.SET_PLAY, true, {
        root: true,
      })
    },
    pauseTrack() {
      this.$store.commit(userMutations.SET.SET_PLAY, false, {
        root: true,
      })
    },
  },
}
</script>
<style lang="scss">
.logoEpisodeImg {
  height: 112px;
  min-width: 112px;
  width: 112px;
}
.episodeName {
  font-size: 16px;
}
.episodeDetailBreak {
  border-color: rgba(255, 255, 255, 0.1);
  box-sizing: border-box;
  display: block;
  unicode-bidi: isolate;
  margin-block-start: 0.5em;
  margin-block-end: 0.5em;
  margin-inline-start: auto;
  margin-inline-end: auto;
  overflow: hidden;
  border-style: inset;
  border-width: 1px;
  margin: 0px;
}
</style>
