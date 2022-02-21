<template>
  <div
    class="
      ml-3
      mb-3
      lg:w-60
      md:w-36
      sm:w-32
      bg-gray-700
      rounded-xl
      overflow-hidden
      shadow-lg
      duration-300
      transform
      transition
      cursor-pointer
    "
    :class="[isHover ? 'scale-125 shadow-xl z-50 shadow-md' : '']"
    @mouseover="mouseOver"
    @mouseleave="mouseleave"
  >
    <NuxtLink :to="`/episode/${card.id}`">
      <img :src="card.img" alt="" />
      <div class="p-2">
        <h1 class="font-bold hover:underline">{{ card.name }}</h1>
        <NuxtLink
          :to="`/creator/${card.creator.id}`"
          class="mt-2 font-semi text-gray-300 hover:underline"
        >
          {{ card.creator.fullName }}
        </NuxtLink>
        <p class="mt-1 text-gray-500 font-">
          {{ dateFormat }} -
          {{ audioLengthFormat }}
        </p>
      </div>
    </NuxtLink>
  </div>
</template>
<script>
import moment from 'moment'
export default {
  name: 'Card',
  props: {
    card: {
      type: Object,
      default() {
        return {
          name: {
            type: String,
            default() {
              return 'El poder de la lampara'
            },
          },
          creator: {
            type: Object,
            default: {
              name: 'John Smith',
            },
          },
          releaseDate: {
            type: String,
            default: 'May 13',
          },
          audioLength: {
            type: Number,
            default: 15,
          },

          img: {
            type: String,
            default:
              'https://images.unsplash.com/photo-1577982787983-e07c6730f2d3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=859&q=80',
          },
        }
      },
    },
  },
  data: function () {
    return {
      isHover: false,
    }
  },
  computed: {
    dateFormat() {
      return moment(this.$props.card.releaseDate).format('DD/MM/YY')
    },
    audioLengthFormat() {
      let time = this.$props.card.audioLength
      if (time >= 60 && time <= 3600) {
        let minutes = Math.floor(time / 60)
        let seconds = time - minutes * 60

        return `${minutes >= 10 ? minutes : ' 0' + minutes.toString()}:${
          seconds >= 10 ? seconds : ' 0' + seconds.toString()
        }`
      } else if (time >= 3600) {
        let hours = Math.floor(time / 3600)
        let minutes = Math.floor(time / 60)
        let seconds = time - minutes * 60
        return `${hours >= 10 ? hours : ' 0' + hours.toString()}:${
          minutes >= 10 ? minutes : ' 0' + minutes.toString()
        }:${seconds >= 10 ? seconds : ' 0' + seconds.toString()}`
      } else {
        return time
      }
    },
  },
  created() {},
  methods: {
    mouseOver: function () {
      this.isHover = true
    },
    mouseleave: function () {
      this.isHover = false
    },
  },
}
</script>
