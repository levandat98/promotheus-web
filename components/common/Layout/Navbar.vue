<template>
  <header class="sticky-bar">
    <div id="navbar" class="container bg-transparent text-gray-300">
      <nav class="bg-transparent flex justify-between items-center py-3">
        <ul
          class="hidden lg:flex lg:items-center lg:w-full ml-20 lg:space-x-12"
        >
          <FormWrapper ref="userFilterForm" :model="search" class="w-1/2">
            <InputWrapper
              rules="no_special|max_length:255"
              prop="name"
              class="el-default-input mb-3 mr-3"
            >
              <el-input
                v-model="search"
                :placeholder="$t('search')"
                type="text"
                autocomplete="off"
                maxlength="255"
                prefix-icon="el-icon-search"
              />
            </InputWrapper>
          </FormWrapper>
        </ul>

        <el-dropdown @command="handleCommand">
          <div
            class="el-dropdown-link flex flex-row justify-center items-center"
          >
            <el-avatar
              class="mr-4"
              :src="user.avatar || defaultAvatar"
            ></el-avatar>
            <div class="flex flex-col mr-4 text-gray-300">
              <p>
                {{ `${user.fullName}` }}
              </p>
            </div>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="profile">Profile</el-dropdown-item>
            <el-dropdown-item command="studio">Studio</el-dropdown-item>
            <el-dropdown-item command="logout">Log out</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </nav>
    </div>
  </header>
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
      search: '',
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
    profile() {
      this.$router.push('/')
    },
    studio() {
      this.$router.push('/studio')
    },
  },
}
</script>
<style lang="scss" scoped>
.navbar {
  height: 100px;
}
#navbar {
  border-bottom: 1px !important;
  border-block-color: white !important;
}
</style>
