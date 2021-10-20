import { Message } from 'element-ui'
import Jimp from 'jimp'
const slug = require('slug')
const moment = require('moment')
// const XLSX = require('xlsx')
// Specially made for Element UI image uploader
export default {
  data() {
    return {
      base64ImagesInDescription: [],
    }
  },
  methods: {
    updateImagesInDescription(imageSrcsArray) {
      this.base64ImagesInDescription = imageSrcsArray.filter((image) => {
        return image.includes(';base64,')
      })
    },
    // Work flow:
    // Get pre-signed url
    // Process files (resize, adjust,...)
    // Send raw file to server
    /// ////////////////////////////////////
    // Process images
    // Save new adjusted fileList
    // let urls = this.getSignedUrlS3(files)
    // loop through fileList and send them each time loop
    /// ////////////////////////////////////
    // Keep getSignedUrlS3 and upload files seperate because:
    // we can get multiple urls
    // but can only upload 1 file at a time (pre-signed url limitation)
    async getSignedUrlS3(files, folderPrefix = 'UNCATEGORIZED_FILES') {
      files = await files.map((file) => {
        // const fileName = this.getUniqueFileName(file)
        return {
          // Get the file's extension
          type: file.type,
          fileName: file.name,
          folderPrefix,
        }
      })
      const response = await this.$baseApi.post('/medias/url-storage', {
        data: files,
      })
      return response.data
    },
    // Has to have .raw (Element UI uploader's format)
    async uploadFilesToS3(files, folderPrefix) {
      const urls = await this.getSignedUrlS3(files, folderPrefix)
      const responseUrls = await Promise.all(
        urls.map(async (url, index) => {
          const response = await this.$fileApi.put(url, files[index])
          if (response.status === 200) {
            const questionIndex = response.config.url.indexOf('?')
            const responseUrl = response.config.url.substring(0, questionIndex)
            return responseUrl
          }
          Message.error('Failed to upload image')
        })
      )
      return responseUrls
    },
    /**
     *
     * @param {String} base64StringArray
     * @param {String} content The content with base64 images in it
     * @param {String} folder Amazon S3 image folder
     * @returns {String} The content with replaced images with urls from Amazon S3
     */
    async uploadBase64ImagesInContentToS3(
      base64StringArray,
      content,
      folder = 'UNCATEGORIED_FOLDER'
    ) {
      // This become an image array
      const convertedImages = await Promise.all(
        base64StringArray.map((image, index) => {
          // Use index to make the images unique because the upload time sometime so fast
          // it causes the images' names the same
          return this.base64ToFile(image, `${slug(moment().format())}-${index}`)
        })
      )
      // Get all the urls
      const responseUrls = await this.uploadFilesToS3(convertedImages, folder)
      // Replace base64String in the content with the url
      await Promise.all(
        responseUrls.map((url, index) => {
          // Submit uploaded images to backend to store on database
          this.$baseApi.post('/medias', {
            type: 'IMAGE',
            name: convertedImages[index].name,
            origin: url,
            medium: url,
            thumbnail: url,
          })
          content = content.replace(base64StringArray[index], url)
        })
      )
      return content
    },
    base64ToFile(base64String, fileName = slug(moment().format())) {
      const arr = base64String.split(',')
      const mime = arr[0].match(/:(.*?);/)[1]
      const bstr = atob(arr[1])
      let n = bstr.length
      const u8arr = new Uint8Array(n)
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }
      return new File([u8arr], fileName, {
        type: mime,
      })
    },
    // sheetFileToJSON(file) {
    //   return new Promise((resolve, reject) => {
    //     const f = file
    //     const reader = new FileReader()
    //     reader.onload = function (e) {
    //       const data = new Uint8Array(e.target.result)
    //       const workbook = XLSX.read(data, { type: 'array' })
    //       const json = XLSX.utils.sheet_to_json(
    //         workbook.Sheets[workbook.SheetNames[0]]
    //       )
    //       resolve(json)
    //     }
    //     reader.readAsArrayBuffer(f)
    //   })
    // },
    // Image only
    async resize(path, width) {
      // Read the image from the blob path (blob:http://....)
      const image = await Jimp.read(path)
      await image.resize(width, Jimp.AUTO)
      // Convert to base64 string
      const base64String = await image.getBase64Async(image.getMIME())
      return this.base64ToFile(
        base64String,
        slug(moment().format()) + '-' + width
      )
    },
  },
}
