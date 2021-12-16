<template>
  <div class="mt-5 justify-self-start justify-items-start">
    <div class="flex justify-between">
      <h1 class="text-2xl font-bold pt-5 pl-3 hover:underline">
        <a href="#">Your Episode</a>
      </h1>
      <h3 class="text-lg font-semi pt-5 mr-32 hover:underline">
        <a href="#">See all</a>
      </h3>
    </div>
    <div class="flex flex-wrap justify-items-start">
      <Card v-for="card in listCard" :key="card.id" :card="card" />
    </div>
  </div>
</template>
<script>
import { Card } from '~/components/uncommon/Genre'
export default {
  name: 'Genre',
  setup() {},
  components: {
    Card,
  },
  props: {
    listCard: {
      type: Array,
      default() {
        const a = []
        for (let i = 0; i < 6; i += 1) {
          a.push({
            id: i,
            name: 'Ba cọc ba đồng',
            img: 'https://i.scdn.co/image/ab6765630000ba8ad5226edb10f2256f04f26180',
          })
        }
        console.log(a)
        return a
      },
    },
  },
}
</script>
