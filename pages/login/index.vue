<template>
  <el-main class="container mx-auto">
    <Login ref="loginForm" @my-login-form-submit="postLogin" />
  </el-main>
</template>

<script>
import { Login } from '~/components/common/Auth'
import { authActions } from '~/store/auth/actions'
export default {
  layout: 'blank',
  // middleware: 'auth',
  components: {
    Login,
  },
  created() {
    // console.log('----------')
    // if (this.$store.state.auth.data) {
    //   console.log('=======================')
    //   this.$router.push(`/`)
    // }
  },
  methods: {
    async postLogin(form) {
      try {
        await this.$store.dispatch(authActions.LOGIN, form)
        this.$router.push(`/`)
        this.$refs.loginForm.reset()
      } catch (err) {
        // console.error(err)
      }
    },
  },
  head() {
    return {
      title: 'Promotheus - Sign in',
    }
  },
}
</script>
