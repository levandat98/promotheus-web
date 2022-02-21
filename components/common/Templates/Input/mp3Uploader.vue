<template>
  <span class="">
    <slot name="trigger">
      <div v-if="!fileList.length" class="" round>
        <div class="flex justify-center">
          <div class="mb-3 w-96">
            <label
              for="formFile"
              class="form-label inline-block mb-2 text-gray-700"
              >Default file input example</label
            >
            <input
              id="formFile"
              class="
                form-control
                block
                w-full
                px-3
                py-1.5
                text-base
                font-normal
                text-gray-700
                bg-white bg-clip-padding
                border border-solid border-gray-300
                rounded
                transition
                ease-in-out
                m-0
                focus:text-gray-700
                focus:bg-white
                focus:border-blue-600
                focus:outline-none
              "
              type="file"
            />
          </div>
        </div>
      </div>
      <span v-else class="cursor-pointer">
        <slot name="preview-lightbox">
          <span v-for="file in fileList" :key="file.uid">
            <img
              class="w-56 h-56 p-6 m-4"
              :src="file.url"
              :alt="file.raw.name"
              @click="triggerFileDialog"
            />
          </span>
        </slot>
      </span>
    </slot>

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
