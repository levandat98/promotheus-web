<template>
  <div
    class="activity__container flex divide-x divide-solid divide-gray-300 py-10"
  >
    <div class="w-1/5 pr-4 text-right leading-10 flex flex-col justify-center">
      <p class="text-right">Thứ 2</p>
      <p class="text-4xl font-bold">22/3</p>
      <p class="text-theme-1">
        <i class="el-icon-date"></i>
        Hôm nay
      </p>
    </div>
    <div class="project__container">
      <div
        v-for="item in 4"
        :key="item"
        class="project__item w-full flex flex-row flex-nowrap"
      >
        <div
          class="flex-1 flex items-center rounded-l-sm rounded-r-md px-2 border-l-4 border-theme-1 border-solid bg-theme-1-200 w-full h-10 mr-2"
        >
          <span>Dự án AudioLoop</span>
        </div>
        <div class="flex-1 flex items-center mr-2">Leader: Minh Toàn</div>
        <div class="flex-1 flex items-center mr-2">7:00 AM - 9:00 AM</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ActivityCalendarItem',
}
</script>

<style lang="scss" scoped>
.project__container {
  @apply flex-grow pl-4 flex flex-col justify-between;
  .project__item:not(:last-child) {
    margin-bottom: 0.5rem;
  }
}
</style>
