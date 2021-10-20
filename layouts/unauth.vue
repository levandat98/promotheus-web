<template>
  <div class="h-screen flex items-center justify-center">
    <nuxt keep-alive />
  </div>
</template>

<script>
export default {
  name: 'Unauth',
}
</script>

<style lang="scss" scoped>
.l_unauth-wrapper {
  background-image: url(~assets/img/bg-login.jpg);
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
