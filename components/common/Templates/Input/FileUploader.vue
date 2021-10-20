<template>
  <span>
    <span @click="triggerFileDialog">
      <slot name="trigger">
        <el-button type="primary" round size="small">
          <span> Upload </span>
        </el-button>
      </slot>
    </span>
    <span>
      <slot name="picked-files">
        <span v-for="file in fileList" :key="file.uid">
          {{ file.raw.name }}
        </span>
      </slot>
    </span>
    <span>
      <slot name="preview-lightbox">
        <span v-for="file in fileList" :key="file.uid">
          <img :src="file.url" :alt="file.raw.name" />
        </span>
      </slot>
    </span>
    <input
      ref="fileInput"
      style="display: none"
      type="file"
      :multiple="multiple"
      @change="handleFileChange"
    />
  </span>
</template>
<script>
// import { random } from '~/utils/functions/random'
let reader = null
export default {
  model: {
    prop: 'fileList',
    event: 'my-uploader-change',
  },
  props: {
    // eslint-disable-next-line vue/require-default-prop
    fileList: [Array, Object],
    multiple: {
      type: Boolean,
      default: false,
    },
    /**
     * For multiple files picking
     */
    limit: {
      type: Number,
      default: 5,
    },
    preview: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      // file: null,
    }
  },
  mounted() {
    reader = new FileReader()
    reader.addEventListener(
      'load',
      () => {
        return reader.result
      },
      false
    )
  },
  methods: {
    triggerFileDialog() {
      this.$refs.fileInput.click()
    },
    readFileTo64Async(file) {
      const base64String = new Promise((resolve) => {
        reader.addEventListener(
          'load',
          (event) => {
            resolve(event.target.result)
          },
          false
        )
      })
      reader.readAsDataURL(file)
      return base64String
    },
    readFileToBlobUrl(file) {
      return URL.createObjectURL(file)
    },
    async handleFileChange(event) {
      const fileArr = await Promise.all(
        Array.from(event.target.files).map(async (file) => {
          /**
           * Return a helpful object instead of a File object
           *
           * Only read the file into base64 string when enable preview mode
           * because base64 is easier to handle
           *
           * There's a uid get from the blob url, use that for unique key binding or whatever
           */
          const fileObj = {
            raw: file,
            url: this.readFileToBlobUrl(file),
            uid: this.readFileToBlobUrl(file).split('/').pop(),
          }
          return this.preview // Read the file into base64 string when enable preview
            ? {
                ...fileObj,
                src: await this.readFileTo64Async(file),
              }
            : fileObj
        })
      )
      this.$emit('my-uploader-change', fileArr)
    },
  },
}
</script>
