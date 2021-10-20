<template>
  <div class="flex items-center">
    <el-avatar
      v-for="({ _id, avatar, profile }, index) in membersInChildGroups"
      :key="'avartar-' + _id"
      size="small"
      :src="avatar"
      :title="profile.fullName"
      :class="sigleAvatarStyle(index)"
    ></el-avatar>
    <el-avatar
      v-if="numberOfMembersLeft > 0"
      size="small"
      class="relative -left-3 border"
      >+{{ numberOfMembersLeft }}</el-avatar
    >
  </div>
</template>

<script>
export default {
  props: {
    initialMembers: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      members: this.initialMembers,
    }
  },
  computed: {
    membersInChildGroups() {
      return this.members.slice(0, 3)
    },
    numberOfMembersLeft() {
      return this.members.length - 3
    },
  },
  methods: {
    sigleAvatarStyle(i) {
      return `relative -left-${i} border`
    },
  },
}
</script>
