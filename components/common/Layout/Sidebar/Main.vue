<template>
  <div
    class="relative duration-300 bg-white"
    :style="{
      width: sidebarCollapsed
        ? `${minWidth}px !important`
        : `${maxWidth}px !important`,
    }"
  >
    <el-aside
      class="duration-300 relative h-full w-full flex flex-col"
      :style="{
        width: sidebarCollapsed
          ? `${minWidth}px !important`
          : `${maxWidth}px !important`,
      }"
    >
      <ul class="overflow-x-hidden overflow-auto flex flex-col">
        <li class="text-center my-10">
          <!--  -->
          <transition name="fade" mode="out-in" :duration="500">
            <img
              v-if="!sidebarCollapsed"
              src="~/assets/img/logo.png"
              class="mx-auto cursor-pointer"
              style="height: 60px"
              @click="$router.push('/')"
            />
            <img
              v-else
              src="~/assets/img/tab-logo.png"
              class="mx-auto cursor-pointer"
              style="height: 60px"
              @click="$router.push('/')"
            />
          </transition>
        </li>
        <!-- Side bar item -->
        <li
          class="block duration-300 w-full text-gray-700"
          :class="[sidebarCollapsed ? '' : 'py-2']"
        >
          <ul class="duration-300">
            <SidebarItem
              v-for="component in sidebar.items"
              :key="'sidebar-' + component.module"
              :component="component"
            />
          </ul>
        </li>
        <!-- End sidebar Item -->
      </ul>
    </el-aside>
    <div class="sidebar-icon" @click="handleCollapse">
      <i v-if="!sidebarCollapsed" class="el-icon-s-fold text-xl"></i>
      <i v-else class="el-icon-s-unfold text-xl"></i>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import SidebarItem from './SidebarItem.vue'
import { sidebar } from '~/constants/config/base/sidebar'
export default {
  name: 'Sidebar',
  components: {
    SidebarItem,
  },
  props: {
    minWidth: {
      type: Number,
      default: 70,
    },
    maxWidth: {
      type: Number,
      default: 250,
    },
  },
  data() {
    return {
      sidebar,
    }
  },
  computed: {
    ...mapState({
      sidebarCollapsed: (state) => state.sidebarCollapsed,
    }),
  },
  methods: {
    handleCollapse() {
      this.$store.commit('TOGGLE_SIDEBAR_COLLAPSE')
    },
  },
}
</script>
<style lang="scss" scoped>
.sidebar-icon {
  right: 0;
  top: 0;
  transform: translate(1.25rem, 10px);
  @apply absolute z-10 w-10 h-10 rounded-full bg-gray-200 text-gray-700 flex justify-center items-center hover:bg-theme-1-200 hover:text-theme-1 cursor-pointer;
}
</style>
