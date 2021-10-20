<template>
  <div class="flex bg-white rounded">
    <div class="flex-1 p-5">
      <div class="flex items-center mb-4">
        <el-avatar
          src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
          icon="el-icon-user-solid"
          class="cursor-pointer"
        >
        </el-avatar>
        <div class="ml-2">
          <h5 class="font-bold text-md">Lê Đỗ Minh Hoàng</h5>
          <p class="text-xs italic text-gray-600">
            Back end <span>&sdot;</span> Lập Trình
          </p>
        </div>
      </div>
      <p class="text-md text-gray-600 mb-5">
        <strong class="text-gray-700">Lý Do:</strong> Bận học ở trường.
      </p>
      <a href="" class="text-theme-1 text-sm">
        Xem chi tiết <i class="el-icon-right font-bold" />
      </a>
    </div>
    <div class="flex flex-col">
      <div
        class="flex items-center flex-1 p-4 rounded-tr cursor-pointer bg-primary-100 text-primary-500 text-xl"
      >
        <i class="el-icon-check font-bold" />
      </div>
      <div
        class="flex items-center flex-1 p-4 rounded-br cursor-pointer bg-danger-100 text-danger-500 text-xl"
      >
        <i class="el-icon-close font-bold" />
      </div>
    </div>
  </div>
</template>
