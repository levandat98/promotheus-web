<template>
  <el-tooltip
    effect="dark"
    :content="$t('sidebar.' + component.module)"
    placement="right"
    :disabled="!sidebarCollapsed"
  >
    <li
      class="
        mb-5
        flex
        cursor-pointer
        duration-300
        hover:bg-theme-1-200 hover:text-theme-1
      "
      :class="{
        'bg-theme-1-200 text-theme-1 font-bold  border-theme-1':
          $route.path.split('/')[1] === component.route.name,
        'py-3 px-8': !sidebarCollapsed,
        'py-3 px-2 flex justify-center items-center': sidebarCollapsed,
        'border-l-[6px] pl-[26px]':
          $route.path.split('/')[1] === component.route.name &&
          !sidebarCollapsed,
      }"
      @click="
        $router.push({
          name: `${component.route.name}`,
        })
      "
    >
      <span :class="sidebarCollapsed ? '' : 'mr-4'">
        <fa :icon="component.icon" />
      </span>
      <span
        class="whitespace-no-wrap ml-1 font-medium"
        :style="{
          display: sidebarCollapsed ? 'none' : 'block',
        }"
      >
        {{ $t('sidebar.' + component.module) }}
      </span>
    </li>
  </el-tooltip>
</template>
<script>
import { mapState } from 'vuex'
export default {
  props: {
    component: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapState({
      sidebarCollapsed: (state) => state.sidebarCollapsed,
    }),
  },
}
</script>
