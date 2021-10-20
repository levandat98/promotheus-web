<template>
  <el-container class="default-layout-container relative bg-gray-100">
    <!-- Left side -->
    <Sidebar />
    <!-- Right side -->
    <el-container class="flex-col default-page-background">
      <Navbar />
      <el-container>
        <nuxt class="relative m-auto" />
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
import { Navbar, Sidebar } from '~/components/common/Layout'
export default {
  name: 'Default',
  components: {
    Navbar,
    Sidebar,
  },
}
</script>
<style lang="scss">
.default-layout-container {
  .el-main {
    background-color: var(--color-gray-100);
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    max-width: var(--max-width);
  }
}
</style>
