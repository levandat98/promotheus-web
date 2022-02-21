<template>
  <div>hihi</div>
</template>
<script>
import { mapState } from 'vuex'

export default {
  name: 'CommentItem',
  props: {},
  computed: mapState({
    locale: (state) => state.locale,
  }),

  methods: {},
}
</script>
<style lang="scss"></style>
