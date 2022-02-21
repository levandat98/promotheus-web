<template>
  <div class="py-4">
    <NuxtLink
      :to="`/series/${serie.id}`"
      class="text-2xl font-light hover:underline cursor-pointer"
    >
      {{ serie.name }}
    </NuxtLink>
    <NuxtLink
      v-for="(episode, index) in serie.episodes"
      :key="index"
      :to="`/episode/${episode.id}`"
      class="
        hover:bg-gray-600
        p-1
        rounded
        cursor-pointer
        grid grid-cols-12
        gap-4
      "
    >
      <div class="pl-2 m-auto">
        {{ index + 1 }}
      </div>
      <div class="">
        <img class="episodeSerieLogo rounded-md" :src="episode.img" alt="" />
      </div>
      <div class="col-span-7 align-middle my-auto">
        {{ episode.name }}
      </div>
      <div class="align-middle my-auto col-span-2">
        {{ audioLengthFormat(episode.audioLength) }}
      </div>
      <fa
        :icon="['fas', 'ellipsis-h']"
        class="
          text-xl
          align-middle
          my-auto
          text-gray-100
          font-medium
          icon
          text-slate-200
        "
      />
    </NuxtLink>
    <span
      class="
        pl-6
        text-sm
        font-light
        text-gray-400
        cursor-pointer
        hover:text-white hover:underline
      "
    >
      show more
    </span>
  </div>
</template>
<script>
export default {
  name: 'SerieItem',
  props: {
    serie: {
      type: Object,
      default() {
        return {
          name: '',
          episodes: [],
        }
      },
    },
  },
  methods: {
    audioLengthFormat(time) {
      if (time >= 60 && time <= 3600) {
        let minutes = Math.floor(time / 60)
        let seconds = time - minutes * 60
        return `${minutes >= 10 ? minutes : ' 0' + minutes.toString()} m ${
          seconds >= 10 ? seconds : ' 0' + seconds.toString()
        } s`
      } else if (time >= 3600) {
        let hours = Math.floor(time / 3600)
        let minutes = Math.floor(time / 60)
        let seconds = time - minutes * 60
        return `${hours >= 10 ? hours : ' 0' + hours.toString()} h ${
          minutes >= 10 ? minutes : ' 0' + minutes.toString()
        }:${seconds >= 10 ? seconds : ' 0' + seconds.toString()} m`
      } else {
        return `${time} s`
      }
    },
  },
}
</script>
<style lang="scss">
.episodeSerieLogo {
  height: 40px;
  min-width: 40px;
  width: 40px;
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
