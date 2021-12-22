<template>
  <el-container class="default-layout-container text-gray-100 relative flex">
    <!-- Left side -->
    <div class="h-screen sticky top-0 z-10">
      <Sidebar />
    </div>
    <!-- Right side -->
    <el-container class="flex-col bg-gray-800">
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
