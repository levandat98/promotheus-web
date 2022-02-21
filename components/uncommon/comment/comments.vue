<template>
  <div class="grid grid-cols-12">
    <div class="avatar">
      <img
        class="w-16 h-16 rounded-lg"
        src="https://i.scdn.co/image/ab67656300005f1f9e0b4846a03bfc78b0bf01c9"
        alt=""
      />
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
  name: 'Comment',
  props: {},
  data() {
    return {
      content: '',
    }
  },
  computed: mapState({
    locale: (state) => state.locale,
  }),

  methods: {},
}
</script>
<style lang="scss"></style>
