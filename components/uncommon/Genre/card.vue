<template>
  <div
    class="
      ml-3
      mb-3
      lg:w-44
      md:w-40
      bg-white
      rounded-xl
      overflow-hidden
      shadow-lg
      hover:shadow-xl hover:scale-125
      duration-300
      transform
      transition
      cursor-pointer
    "
  >
    <img :src="card.img" alt="" />
    <div class="p-2">
      <h1 class="font-bold">{{ card.name }}</h1>
      <p class="mt-2 font-semi text-gray-600">{{ card.author }}</p>
      <p class="mt-1 text-gray-500 font-">
        {{ card.releaseDate }} - {{ card.audioLength }}
        {{ card.audioLengthUnit }}
      </p>
    </div>
  </div>
</template>
<script>
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
          author: {
            type: String,
            default: 'John Smith',
          },
          releaseDate: {
            type: String,
            default: 'May 13',
          },
          audioLength: {
            type: Number,
            default: 15,
          },
          audioLengthUnit: {
            type: String,
            default: 'Min',
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
}
</script>
