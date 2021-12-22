<template>
  <div>
    <el-container class="default-layout-container text-gray-100 text-gray-100">
      <!-- Left side -->
      <Sidebar />
      <!-- Right side -->
      <el-container class="flex-col bg-gray-800">
        <Navbar />
        <el-container>
          <nuxt class="relative" />
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { Navbar, Sidebar } from '~/components/common/Layout'
import { PlayerBar } from '~/components/uncommon/Player'
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
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    max-width: var(--max-width);
  }
}
</style>
