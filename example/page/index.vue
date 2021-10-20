<template>
  <el-main>
    <!--  -->
  </el-main>
</template>
<script>
import { config } from './config'
export default {
  name: 'Home',
  meta: {
    config,
  },
  middleware: ['auth'],
  head() {
    return {
      title: this.$t('example-page.title'),
    }
  },
}
</script>
