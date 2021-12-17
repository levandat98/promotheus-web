<template>
  <div v-if="loading" id="preloader-active">
    <div class="preloader flex-1 content-center">
      <div class="logo absolute inset-y-2/4 jump">
        <img src="~/assets/img/logos/favicon.svg" alt="" />
        <h1 class="text-lg -ml-7 font-semibold">Promotheus</h1>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    loading: false,
  }),
  methods: {
    start() {
      this.loading = true
    },
    finish() {
      this.loading = false
    },
  },
}
</script>
