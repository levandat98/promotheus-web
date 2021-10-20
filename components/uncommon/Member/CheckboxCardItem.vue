<template>
  <label for="leader1" class="cursor-pointer block">
    <el-card>
      <div class="flex items-center">
        <input
          id="leader1"
          type="checkbox"
          :checked="checked"
          :value="value"
          class="absolute opacity-0 invisable"
          @input="change"
        />
        <div class="pr-3 flex-1">
          <h5 class="font-medium">Võ Chính</h5>
          <p>Chuyên Môn Lập Trình</p>
        </div>
        <fa
          v-show="!checked"
          :icon="['far', 'circle']"
          class="text-2xl text-theme-1"
        />
        <fa
          v-show="checked"
          :icon="['fas', 'check-circle']"
          class="text-2xl text-theme-1"
        />
      </div>
    </el-card>
  </label>
</template>

<script>
export default {
  // eslint-disable-next-line vue/require-prop-types
  props: ['value'],
  data() {
    return {
      checked: this.value,
    }
  },
  methods: {
    change() {
      this.checked = !this.checked
      this.$emit('input', this.checked)
    },
  },
}
</script>
