<template>
  <div class="relative">
    <div
      ref="navigationTabs"
      class="navigation-tabs px-8 border-b overflow-x-scroll flex"
    >
      <div
        class="icon-left z-10 h-full flex items-center justify-center absolute top-0 left-0 bg-gray-100 text-gray duration-300 cursor-pointer"
        style="width: 40px"
        @click="toLeft"
      >
        <fa :icon="['fas', 'chevron-left']" />
      </div>
      <div
        class="icon-right z-10 h-full flex items-center justify-center absolute top-0 right-0 bg-gray-100 text-gray duration-300 cursor-pointer"
        style="width: 40px"
        @click="toRight"
      >
        <fa :icon="['fas', 'chevron-right']" />
      </div>
      <span
        v-for="tab in data"
        :key="'tab-' + tab.key"
        class="inline-block text-center py-2 px-8 mr-8 border-b-4 cursor-pointer duration-300"
        :class="[
          isActive(tab)
            ? 'border-theme-1 text-theme-1 font-bold'
            : 'hover:text-gray-600 border-gray-100 font-medium text-gray-300',
        ]"
        style="min-width: 200px"
        @click="
          $router.push({
            name: tab.key,
            params: params,
          })
        "
      >
        {{ $t(tab.label) }}
      </span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    data: {
      type: Array,
      default() {
        return [
          {
            label: 'example.index.tab-1',
            key: 'example', // For active check
          },
        ]
      },
      required: true,
    },
    params: {
      type: Object,
      default() {
        return {}
      },
    },
    activeKey: {
      type: String,
      default: null,
    },
  },
  methods: {
    toLeft() {
      this.$refs.navigationTabs.scrollLeft -= 400
    },
    toRight() {
      this.$refs.navigationTabs.scrollLeft += 400
    },
    isActive(tab) {
      if (this.activeKey && this.activeKey === tab.key.trim()) {
        return true
      } else {
        return this.$route.name.trim() === tab.key.trim()
      }
    },
  },
}
</script>
<style lang="scss">
.navigation-tabs {
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    height: 1px;
    overflow: hidden;
  }
  &::-webkit-scrollbar-track {
    background: var(--color-gray-100);
  }
  &::-webkit-scrollbar-thumb {
    background-color: var(--color-theme-1-300);
  }
  .icon-left,
  .icon-right {
    opacity: 0;
  }
  &:hover {
    .icon-left,
    .icon-right {
      opacity: 1;
    }
  }
}
</style>
