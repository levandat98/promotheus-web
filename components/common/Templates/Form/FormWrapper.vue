<template>
  <el-form
    ref="wrappedForm"
    :model="model"
    :label-position="labelPosition"
    @submit.native.prevent="submitForm"
  >
    <slot></slot>
  </el-form>
</template>
<script>
export default {
  name: 'FormWrapper',
  props: {
    // eslint-disable-next-line vue/require-prop-types
    model: {
      required: true,
    },
    labelPosition: {
      type: String,
      default: 'top',
    },
  },
  methods: {
    reset() {
      this.$refs.wrappedForm.resetFields()
    },
    clear() {
      this.$refs.wrappedForm.clearValidate()
    },
    submitForm() {
      let valid = true
      this.$refs.wrappedForm.validate((val) => {
        valid = val
      })
      if (valid) this.$emit('onSubmit')
    },
  },
}
</script>
