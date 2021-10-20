<template>
  <div class="mb-5">
    <div class="flex items-center mb-2">
      <el-divider class="inline-block w-10 bg-gray-600" />
      <span class="mx-5 font-medium text-gray-700">{{ title }}</span>
      <el-button
        type="primary"
        size="medium"
        plain
        class="border-0"
        @click="$router.push('/members/groups/creating')"
        ><i class="el-icon-plus font-bold"></i> Thêm Nhóm</el-button
      >
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: 'Untitled',
    },
  },
}
</script>
