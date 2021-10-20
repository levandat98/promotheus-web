<template>
  <el-select
    v-model="selected"
    v-loadmore="loadMoreDataSearch"
    class="w-full"
    filterable
    :clearable="clearable"
    :disabled="disabled"
    remote
    :value-key="valueKey"
    :placeholder="$t(placeholder)"
    :remote-method="handleDataSearch"
    @clear="$emit('my-infinite-select-search', '')"
    @change="$emit('change', selected)"
    @focus="handleFocus"
  >
    <div v-loading="isLoading">
      <el-option
        v-for="(option, index) in options"
        :key="'infinite-option-' + index"
        :label="option[labelKey]"
        :value="valueIsObject ? option : option[valueKey]"
      >
        <slot :item="{ option, index }" />
      </el-option>
    </div>
  </el-select>
</template>
<script>
export default {
  directives: {
    loadmore: {
      bind(el, binding) {
        // Get the scroll box defined by element-ui
        const selectWrapDOM = el.getElementsByClassName(
          'el-select-dropdown__wrap'
        )[0]
        selectWrapDOM.addEventListener('scroll', function (event) {
          const condition =
            event.target.scrollHeight - event.target.scrollTop - 1 <=
            event.target.clientHeight
          if (condition) {
            binding.value()
          }
        })
      },
    },
  },
  model: {
    prop: 'value',
    event: 'change',
  },
  props: {
    // eslint-disable-next-line vue/require-prop-types
    value: {
      required: true,
    },
    options: {
      type: Array,
      required: true,
      default() {
        return []
      },
    },
    labelKey: {
      type: String,
      default: 'name',
    },
    valueKey: {
      type: String,
      default: 'id',
    },
    valueIsObject: {
      type: Boolean,
      default: false,
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
      default: 'input.select.placeholder',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    clearable: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      selected: null,
    }
  },
  watch: {
    // Không chạy nếu component bị destroy và hiển thị lên lại
    // Xảy ra khi dùng modal, drawer hoặc v-if khiến component bị destroy
    //
    // Watcher không chạy trong lần đầu fill giá trị value vào component
    value() {
      this.selected = this.value ? JSON.parse(JSON.stringify(this.value)) : null
    },
  },
  created() {
    // Fill the form if has value
    // Watcher doesn't work in initial component load
    // This is for when you put this component inside a destroyable component
    this.selected = JSON.parse(JSON.stringify(this.value))
  },
  methods: {
    loadMoreDataSearch() {
      this.$emit('my-infinite-select-load-more')
    },
    handleDataSearch(payload) {
      this.$emit('my-infinite-select-search', payload)
    },
    handleFocus() {
      if (!this.selected || Object.keys(this.selected).length === 0) {
        this.$emit('my-infinite-select-search', '')
      }
      this.$emit('my-on-focus')
    },
  },
}
</script>
