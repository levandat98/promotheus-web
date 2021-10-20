// loadmore.js
export default {
  inserted: (el, binding) => {
    const selectwrapDom = el.querySelector(
      '.el-select-dropdown .el-select-dropdown__wrap'
    )
    selectwrapDom.addEventListener('scroll', function () {
      const condition = this.scrollHeight - this.scrollTop <= this.clientHeight
      if (condition) {
        binding.value()
      }
    })
  },
}
