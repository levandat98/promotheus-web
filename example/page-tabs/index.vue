<template>
  <el-main class="p-0">
    <div class="px-8 pt-8">
      <Breadcrumb :title="$t('example.title')" />
    </div>
    <NavigationTabs :data="navigationTabs" />
    <div class="p-8">
      <!--  -->
    </div>
  </el-main>
</template>
<script>
import { config } from './config'
import { NavigationTabs } from '~templates/Tab'
import { Breadcrumb } from '~templates/Breadcrumb'
export default {
  name: 'Home',
  meta: {
    config,
  },
  middleware: ['auth'],
  components: {
    Breadcrumb,
    NavigationTabs,
  },
  data() {
    return {
      navigationTabs: [],
    }
  },
  head() {
    return {
      title: this.$t('example.title'),
    }
  },
}
</script>
