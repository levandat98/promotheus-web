<template>
  <div
    id="goBackTabs"
    class="px-8 border-b overflow-x-scroll flex go-back-tabs"
  >
    <span
      style="height: 40px"
      class="btn bg-gray-300 hover:bg-gray-400 text-gray-600 hover:text-gray-100 text-center"
      @click="
        // eslint-disable prettier/prettier

        !desRoute
          ? $router.go(-1)
          : $route.push({
            name: `${$store.getters['auth/roleGroup']}-${desRoute}`,
          })
      "
    >
      <fa class="mr-2" :icon="['fas', 'arrow-left']" />
      <span style="min-width: 45px"> Trở về </span>
    </span>
  </div>
</template>
<script>
export default {
  props: {
    desRoute: {
      type: String,
      default: '',
    },
  },
}
</script>
<style lang="scss">
.go-back-tabs {
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    height: 4px;
    overflow: hidden;
  }
  &::-webkit-scrollbar-track {
    background: var(--color-gray-100);
  }
  &::-webkit-scrollbar-thumb {
    background-color: var(--color-theme-1-300);
  }
}
</style>
