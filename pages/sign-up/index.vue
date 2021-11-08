<template>
  <el-main class="container mx-auto">
    <Signup ref="signUpform" @signUp-form-submit="postSignUp" />
  </el-main>
</template>

<script>
import { Signup } from '~/components/common/Auth'
import { Message } from 'element-ui'

export default {
  layout: 'blank',
  // middleware: 'auth',
  components: {
    Signup,
  },
  created() {
    // console.log('----------')
    // if (this.$store.state.auth.data) {
    //   console.log('=======================')
    //   this.$router.push(`/`)
    // }
  },
  methods: {
    async postSignUp(form) {
      if (form.confirmPassword !== form.password) {
        Message.error('password and confirm password is not equal')
        return 0
      }

      switch (form.gender) {
        case true:
          form.gender = 'FEMALE'
          break
        case false:
          form.gender = 'MALE'
          break
        default:
          form.gender = 'OTHER'
          break
      }
      delete form.confirmPassword
      const { data } = await this.$clientApi.post('/auth/sign-up', form)
    },
  },
  head() {
    return {
      title: 'Promotheus - Sign up',
    }
  },
}
</script>
