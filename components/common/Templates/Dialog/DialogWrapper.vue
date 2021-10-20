<template>
  <el-dialog
    :id="id"
    :visible.sync="dialogVisible"
    :title="title"
    :append-to-body="true"
    :width="width"
    :fullscreen="fullscreen"
    :destroy-on-close="true"
    :center="center"
  >
    <slot />
  </el-dialog>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: 'Dialog',
    },
    id: {
      type: String,
      required: true,
    },
    width: {
      type: String,
      default: '50%',
    },
    fullscreen: {
      type: Boolean,
      default: false,
    },
    center: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      dialogVisible: false,
    }
  },
  watch: {
    dialogVisible() {
      if (this.dialogVisible) {
        this.$emit('my-dialog-on')
      } else {
        this.$emit('my-dialog-off')
      }
    },
  },
  created() {
    this.$root.$on('my-dialog-show', (id) => {
      if (this.id === id) {
        this.dialogVisible = true
      }
    })
    this.$root.$on('my-dialog-hide', (id) => {
      if (this.id === id) {
        this.dialogVisible = false
      }
    })
  },
}
</script>
