<template>
  <div>
    <div>
      <div class="flex align-bottom mb-3">
        <p class="text-xl flex-1 font-medium text-gray-600 leading-9">
          {{ moment }}
        </p>
        <el-button size="mini px-2 py-0.5 text-xl text-theme-1">
          <i class="el-icon-date" />
        </el-button>
      </div>
      <v-date-picker
        v-model="date"
        title-position="left"
        :dates="date"
        is-expanded
        highlight="true"
      />
    </div>

    <el-divider class="w-1/2 mx-auto" />

    <!-- TODO: implement later -->
    <!-- <div>
      <div class="text-gray-600 font-medium mb-2">
        <span class="text-lg"><i class="el-icon-s-order"></i></span>
        Yêu Cầu Hôm Nay
      </div>
      <div class="custom-el-tabs">
        <el-tabs type="card" @tab-click="handleClick">
          <el-tab-pane>
            <span slot="label">Xin Nghỉ <span class="no-notif">2</span></span>
            <RequestCard class="mb-2" />
            <RequestCard class="mb-2" />
          </el-tab-pane>
          <el-tab-pane>
            <span slot="label">Xin Trễ <span class="no-notif">4</span></span>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div> -->
  </div>
</template>

<script>
import moment from 'moment'
import { mapState } from 'vuex'
// import RequestCard from './RequestCard.vue'
export default {
  components: {
    // RequestCard,
  },
  data() {
    return {
      date: new Date(),
    }
  },
  computed: {
    ...mapState({
      locale: (state) => state.locale,
    }),
    moment() {
      moment().locale(this.locale)
      return moment().format('LL')
    },
  },
  methods: {
    handleClick() {},
  },
}
</script>

<style lang="scss" scoped>
.no-notif {
  padding: 4px 8px;
  background-color: var(--color-danger-500);
  border-radius: 50%;
  color: white;
}
</style>
