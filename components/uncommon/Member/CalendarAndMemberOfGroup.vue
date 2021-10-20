<template>
  <div>
    <!-- <div class="mt-10">
      <el-button
        icon="el-icon-back"
        circle
        @click="$router.push('/members/groups/creating')"
      ></el-button>
      <span class="ml-7"> Thêm nhóm chuyên môn </span>
    </div> -->
    <el-card class="mt-5">
      <el-row :gutter="20">
        <el-col :span="13">
          <div>
            <fa :icon="['fas', 'users']" class="mr-5 text-theme-1" />
            <span>Tên nhóm</span>
          </div>
          <el-input class="mt-5" value=" Phân tích kinh doanh "></el-input>
          <div>
            <i class="text-theme-1 mr-5 mt-5 el-icon-date"></i>
            <span>Chọn lịch hoạt động</span>
          </div>
          <div class="flex justify-between mt-2">
            <el-select v-model="value" placeholder="Thứ" class="w-1/5">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
            <el-time-picker
              v-model="value1"
              is-range
              range-separator="-"
              start-placeholder="Start time"
              end-placeholder="End time"
              class="w-1/2"
            >
            </el-time-picker>
            <el-button type="primary" @click="onAdd">
              <i class="el-icon-check"></i>
            </el-button>
          </div>
          <el-row v-for="(item, index) in calendar" :key="index" class="mt-5">
            <div
              class="flex flex-row justify-between border-solid border-2 p-2 rounded"
              style="border-color: #4e5983"
            >
              <span class="pt-2" style="min-width: 80px">{{ item.day }}</span>
              <div
                class="w-2 border-r-2 border-solid inline mr-2"
                style="border-color: #4e5983"
              ></div>
              <fa :icon="['fas', 'clock']" class="mr-3 mt-2" />
              <span class="pt-2"
                >{{ item.startTime }} - {{ item.endTime }}</span
              >
              <el-button type="danger" plain @click="onDelete(index)"
                >Xóa</el-button
              >
            </div>
          </el-row>
        </el-col>
        <el-col :span="11">
          <div>
            <fa :icon="['fas', 'user-plus']" class="mr-5 text-theme-1" />
            <span>Thêm thành viên</span>
          </div>
          <div
            class="border-solid border-2 p-2 mt-5 rounded"
            style="border-color: #4e5983"
          >
            <el-input
              v-model="input2"
              placeholder="Type something"
              prefix-icon="el-icon-search"
              class="mb-5"
            >
            </el-input>
            <el-row v-for="index in 6" :key="index" :span="8">
              <div class="flex flex-row justify-between mt-2">
                <div>
                  <el-avatar
                    src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                  ></el-avatar>
                </div>
                <div class="flex flex-col ml-3">
                  <span
                    >Nguyễn Văn Võ Trung Hiếu
                    <fa
                      :icon="['fas', 'check-circle']"
                      class="mr-3 mt-2 text-theme-1"
                  /></span>
                  <span>Chưa có nhóm chuyên môn</span>
                </div>
                <el-button type="danger" plain>Xóa</el-button>
              </div>
            </el-row>
          </div>
        </el-col>
      </el-row>
      <!-- <div class="flex justify-end">
        <el-button class="mt-3" type="primary">Tiếp tục</el-button>
      </div> -->
    </el-card>
  </div>
</template>
<script>
import moment from 'moment'
export default {
  data() {
    return {
      value1: [new Date(2016, 9, 10, 8, 40), new Date(2016, 9, 10, 9, 40)],
      calendar: [
        {
          day: 'Thứ hai',
          startTime: moment(new Date()).format('LT'),
          endTime: moment(new Date()).format('LT'),
        },
        {
          day: 'Thứ ba',
          startTime: moment(new Date()).format('LT'),
          endTime: moment(new Date()).format('LT'),
        },
        {
          day: 'Thứ tư',
          startTime: moment(new Date()).format('LT'),
          endTime: moment(new Date()).format('LT'),
        },
        {
          day: 'Thứ năm',
          startTime: moment(new Date()).format('LT'),
          endTime: moment(new Date()).format('LT'),
        },
      ],
      options: [
        {
          value: 'Thứ 2',
          label: 'Thứ 2',
        },
        {
          value: 'Thứ 3',
          label: 'Thứ 3',
        },
        {
          value: 'Thứ 4',
          label: 'Thứ 4',
        },
        {
          value: 'Thứ 5',
          label: 'Thứ 5',
        },
        {
          value: 'Thứ 6',
          label: 'Thứ 6',
        },
        {
          value: 'Thứ 7',
          label: 'Thứ 7',
        },
        {
          value: 'Chủ nhật',
          label: 'Chủ nhật',
        },
      ],
      value: '',
      input2: '',
    }
  },
  methods: {
    onAdd() {
      this.calendar.push({
        day: this.value,
        startTime: moment(new Date()).format('LT'),
        endTime: moment(new Date()).format('LT'),
      })
    },
    onDelete(id) {
      this.calendar.splice(id, 1)
    },
  },
}
</script>
<style></style>
