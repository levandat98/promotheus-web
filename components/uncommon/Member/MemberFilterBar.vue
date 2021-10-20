<template>
  <div style="min-height: 90px">
    <FormWrapper
      ref="userFilterForm"
      :model="form"
      class="flex my-10 flex-wrap"
    >
      <InputWrapper
        rules="no_special|max_length:255"
        prop="name"
        class="el-default-input mb-3 mr-3"
        style="width: 500px"
      >
        <el-input
          v-model="form[`profile.fullName`]"
          :placeholder="$t('users.index.name')"
          type="text"
          autocomplete="off"
          maxlength="255"
          prefix-icon="el-icon-search"
        />
      </InputWrapper>
      <!-- <template>
        <el-select v-model="value" placeholder="Select" multiple>
          <el-option-group
            v-for="group in options"
            :key="group.label"
            :label="group.label"
          >
            <el-option
              v-for="item in group.options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-option-group>
        </el-select>
      </template> -->
      <template>
        <el-select v-model="form.status" placeholder="Select">
          <el-option
            v-for="item in statuses"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </template>
      <div class="flex flex-row justify-between ml-10" style="width: 220px">
        <span
          style="height: 40px"
          class="rounded-lg bg-theme-1 hover:bg-theme-1-600 text-white w-36 items-center"
          @click="handleFilter"
        >
          <!-- <fa :icon="['fas', 'filter']" class="mr-2" /> -->
          <span class="p-2 flex justify-center">
            <p>{{ $t('users.search') }}</p>
          </span>
        </span>
        <span
          style="height: 40px"
          class="rounded-lg bg-gray-300 hover:bg-gray-400 text-gray-600 hover:text-gray-100 text-center items-center"
          @click="resetFilter"
        >
          <!-- <fa :icon="['fas', 'times']" class="mr-2" /> -->
          <span style="min-width: 45px" class="p-2 flex justify-center">
            {{ $t('users.reset-filter') }}
          </span>
        </span>
      </div>
      <!-- <el-dropdown>
        <span class="el-dropdown-link">
          Dropdown List<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>Action 1</el-dropdown-item>
          <el-dropdown-item>Action 2</el-dropdown-item>
          <el-dropdown-item>Action 3</el-dropdown-item>
          <el-dropdown-item disabled>Action 4</el-dropdown-item>
          <el-dropdown-item divided>Action 5</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown> -->
    </FormWrapper>
  </div>
</template>
<script>
import filterBarMixin from '~/mixins/components/filterBar'
import { FormWrapper, InputWrapper } from '~/components/common/Templates/Form'

// const moment = require('moment')

export default {
  components: {
    FormWrapper,
    InputWrapper,
  },
  mixins: [filterBarMixin],

  data() {
    return {
      form: {
        [`profile.fullName`]: null,
        status: null,
      },
      filterMap: {
        [`profile.fullName`]: '$eq',
        status: '$eq',
      },
      filter: [],
      options: [
        {
          label: 'Chuyên môn',
          options: [
            {
              value: 'Lập Trình',
              label: 'Lập Trình',
            },
            {
              value: 'Thiết Kế',
              label: 'Thiết Kế',
            },
            {
              value: 'Marketing Online',
              label: 'Marketing Online',
            },
          ],
        },
        {
          label: 'Tháng sinh',
          options: [
            {
              value: 'Tháng 1',
              label: 'Tháng 1',
            },
            {
              value: 'Tháng 2',
              label: 'Tháng 2',
            },
            {
              value: 'Tháng 3',
              label: 'Tháng 3',
            },
            {
              value: 'Tháng 4',
              label: 'Tháng 4',
            },
            {
              value: 'Tháng 5',
              label: 'Tháng 5',
            },
            {
              value: 'Tháng 6',
              label: 'Tháng 6',
            },
            {
              value: 'Tháng 7',
              label: 'Tháng 7',
            },
            {
              value: 'Tháng 8',
              label: 'Tháng 8',
            },
            {
              value: 'Tháng 9',
              label: 'Tháng 9',
            },
            {
              value: 'Tháng 10',
              label: 'Tháng 10',
            },
            {
              value: 'Tháng 11',
              label: 'Tháng 11',
            },
            {
              value: 'Tháng 12',
              label: 'Tháng 12',
            },
          ],
        },
        {
          label: 'Trạng thái hoạt động',
          options: [
            {
              value: 'Đang hoạt động',
              label: 'Đang hoạt động',
            },
            {
              value: 'Tạm dừng',
              label: 'Tạm dừng',
            },
          ],
        },
      ],
      value: '',
      statuses: [
        {
          value: 'AVAILABLE',
          label: 'Đang hoạt động',
        },
        {
          value: 'PENDING',
          label: 'Đang chờ',
        },
        {
          value: 'SUSPEND',
          label: 'Tạm dừng',
        },
      ],
      status: '',
    }
  },
  // created() {
  //   this.fillFormFromQuery(this.$store.state.users.query)
  // },
  methods: {
    handleFilter() {
      // console.log('[this.filter]', this.filter)
      if (this.filter) {
        this.$emit('my-user-filter', this.filter)
      }
    },
    resetFilter() {
      this.form = {
        [`profile.fullName`]: null,
        status: null,
      }
      this.filter = null
      // this.form.handle()
      this.$refs.userFilterForm.reset()
      this.$emit('my-user-filter-refresh')
    },
  },
}
</script>
