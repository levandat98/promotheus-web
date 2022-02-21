<template>
  <div class="grid grid-cols-12">
    <div class="avatar">
      <img
        class="w-16 h-16 rounded-lg"
        src="https://i.scdn.co/image/ab67656300005f1f9e0b4846a03bfc78b0bf01c9"
        alt=""
      />
    </div>
    <div class="align-middle my-auto w-full">
      <div>hihi</div>
      <el-input
        v-model="content"
        type="textarea"
        :autosize="{ minRows: 1, maxRows: 4 }"
        placeholder="Please input"
        class="bg-gray-600"
      >
      </el-input>
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
<style lang="scss">
.el-textarea__inner {
  background-color: var(--color-gray-900);
  border: 0px;
  color: #f8f9fa;
  max-width: 960px;
}
.el-textarea {
  background-color: var(--color-gray-800) !important;
}
</style>
