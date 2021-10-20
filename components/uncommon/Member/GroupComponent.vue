<template>
  <el-card :body-style="{ padding: '0px' }" class="relative min-w-min">
    <div class="px-6 py-5">
      <el-button
        size="mini"
        type="danger"
        plain
        class="p-1 border-0 absolute top-3 right-3"
        ><i class="el-icon-close font-bold text-md"></i
      ></el-button>

      <h4 class="font-bold text-gray-700 mb-2">
        {{ group.name }}
        <span class="ml-2 cursor-pointer"
          ><i class="el-icon-edit font-bold"></i
        ></span>
      </h4>

      <div class="flex mb-3">
        <MultiAvatars :initial-members="group.members" />
        <div class="flex items-center ml-16">
          <fa
            :icon="['fas', 'user-astronaut']"
            class="text-2xl text-theme-1 mr-1"
          />
          <el-avatar
            size="small"
            :src="$e(group, 'leader?.avatar')"
            :title="$e(group, 'leader?.profile?.fullName')"
          ></el-avatar>
        </div>
      </div>

      <div>
        <h5 class="text-sm text-gray-600 mb-2">
          <fa :icon="['fas', 'users']" class="text-xl text-theme-1 mr-1" />
          {{ $e(group, 'childs?.length') }} Nhóm chuyên môn
        </h5>
        <div class="grid grid-cols-2 gap-3">
          <el-button
            v-for="{ _id, name } in childGroups"
            :key="'btn-group-' + _id"
            size="mini"
            class="m-0"
            >{{ name }}</el-button
          >
          <el-button
            v-if="numberOfChildGroupsLeft > 0"
            size="mini"
            type="text"
            class="underline"
          >
            + {{ numberOfChildGroupsLeft }} nhóm nữa
          </el-button>
        </div>
      </div>
    </div>

    <el-button
      type="primary"
      class="w-full rounded-t-none"
      @click="onShowDetail"
      >Xem Chi Tiết <i class="el-icon-right"></i
    ></el-button>
  </el-card>
</template>

<script>
import MultiAvatars from './MultiAvatars.vue'
import { groupMutations } from '~/store/groups/mutations'

export default {
  components: {
    MultiAvatars,
  },
  props: {
    initialGroup: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      group: this.initialGroup,
    }
  },
  computed: {
    childGroups() {
      return this.group?.children?.slice(0, 3)
    },
    numberOfChildGroupsLeft() {
      return this.group?.childs?.length - 3
    },
  },
  methods: {
    onShowDetail() {
      console.log('[this.group]', this.group)
      this.$store.commit(groupMutations.SET.VIEWING_GROUP, this.group)
      this.$router.push('/members/groups/groupDetail')
    },
  },
}
</script>
