<template>
  <div>
    <div class="">
      <h1>{{ genre.name }}</h1>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    genre: {
      type: Object,
      default() {
        return {
          name: 'Games',
        }
      },
    },
  },
}
</script>
