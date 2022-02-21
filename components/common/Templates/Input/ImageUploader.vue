<template>
  <span class="">
    <slot name="trigger">
      <div v-if="!fileList.length" class="" round>
        <div class="m-4">
          <label class="inline-block mb-2 cursor-pointer text-gray-500"
            >Upload cover Image</label
          >
          <div class="flex items-center justify-center w-56">
            <label
              class="
                flex flex-col
                w-56
                h-56
                border-4 border-blue-200 border-dashed
                hover:bg-gray-100 hover:border-gray-300
                cursor-pointer
              "
              @click="triggerFileDialog"
            >
              <div class="flex flex-col items-center justify-center pt-12">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-24 h-24 text-gray-400 group-hover:text-gray-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
                <p
                  class="
                    pt-1
                    text-xl
                    tracking-wider
                    text-gray-400
                    group-hover:text-gray-600
                  "
                >
                  Upload Image
                </p>
              </div>
            </label>
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
