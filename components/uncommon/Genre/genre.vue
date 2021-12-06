<template>
  <div>
    <div class="flex justify-between">
      <h1 class="text-2xl font-bold pt-5 pl-3"><a href="#">Your Episode</a></h1>
      <h3 class="text-xl font-semi pt-5 mr-32"><a href="#">See all</a></h3>
    </div>
    <div class="flex flex-wrap">
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
        for (let i = 0; i < 10; i += 1) {
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
