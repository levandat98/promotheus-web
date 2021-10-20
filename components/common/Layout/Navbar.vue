<template>
  <nav class="navbar bg-gray-100 flex justify-center w-full">
    <div
      class="flex justify-between w-full"
      style="max-width: var(--max-width)"
    >
      <div class="flex items-center">
        <span class="text-5xl font-bold text-theme-1 m-3">
          {{ $store.getters['pageTitle'] }}
        </span>
      </div>
      <div class="flex items-center">
        <div class="mx-4">
          <fa class="text-theme-1 text-lg" :icon="['fas', 'bell']"></fa>
        </div>
        <el-dropdown @command="handleCommand">
          <div
            class="el-dropdown-link flex flex-row justify-center items-center"
          >
            <el-avatar
              class="mr-4"
              :src="user.avatar || defaultAvatar"
            ></el-avatar>
            <div class="flex flex-col mr-4">
              <p>
                {{
                  `${user.profile && user.profile.firstName} ${
                    user.profile && user.profile.lastName
                  }`
                }}
              </p>
              <p>{{ user.email }}</p>
            </div>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="logout">Log out</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </nav>
</template>

<script>
import { get } from 'lodash'
import { mapState } from 'vuex'
import { DEFAULT_AVATAR } from '~/constants/common'

export default {
  name: 'Navbar',
  data() {
    return {
      defaultAvatar: DEFAULT_AVATAR,
    }
  },
  computed: {
    ...mapState({
      locale: (state) => state.locale,
    }),
    ...mapState({
      user: (state) => get(state, 'auth.data.user'),
    }),
  },
  methods: {
    handleCommand(command) {
      this[command]()
    },
    logout() {
      this.$store.dispatch('auth/logout')
      this.$router.push('/login')
    },
  },
}
</script>
<style lang="scss" scoped>
.navbar {
  height: 100px;
}
</style>
