<template>
  <el-main class="pt-20 flex">
    <div class="">
      <FormWrapper :model="episodeModel">
        <div class="flex">
          <div class="flex-1">
            <div class="py-4">
              <InputWrapper rules="required" prop="name">
                <span slot="label" class="text-md font-medium">
                  Episode Name
                </span>
                <el-input
                  v-model="episodeModel.name"
                  maxlength="100"
                  placeholder="enter episode name"
                ></el-input>
              </InputWrapper>
            </div>
            <div class="py-4">
              <InputWrapper rules="required" prop="description">
                <span slot="label" class="text-md font-medium">
                  Description
                </span>
                <el-input
                  v-model="episodeModel.description"
                  type="textarea"
                  :rows="6"
                  placeholder="enter description"
                ></el-input>
              </InputWrapper>
            </div>
            <div class="py-4">
              <InputWrapper rules="required" prop="description">
                <div slot="label" class="text-md font-medium">Serie</div>
                <el-select
                  v-model="episodeModel.serieId"
                  placeholder="Select"
                  class="w-2/3"
                >
                  <el-option
                    v-for="(item, index) in serie"
                    :key="index"
                    :label="item.name"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </InputWrapper>
              <InputWrapper rules="required" prop="description">
                <div slot="label" class="text-md font-medium pt-4">Genre</div>
                <el-select
                  v-model="episodeModel.serieId"
                  placeholder="Select"
                  class="w-2/3"
                >
                  <el-option
                    v-for="(item, index) in serie"
                    :key="index"
                    :label="item.name"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </InputWrapper>
            </div>
          </div>
          <div>
            <ImageUploader
              v-model="fileList"
              :preview="true"
              :multiple="false"
              :limit="1"
              class=""
            />
          </div>
        </div>
        <el-button
          type="primary"
          native-type="submit"
          class="w-full"
          @click="handleSubmit"
        >
          Update
        </el-button>
      </FormWrapper>
    </div>
  </el-main>
</template>
<script>
import { mapMutations, mapActions, mapState } from 'vuex'
import qs from 'qs'
import moment from 'moment'
import { config } from './config'
import { episodeMutations as moduleMutations } from '~/store/studio/episode/mutations'
import { episodeActions as moduleActions } from '~/store/studio/episode/actions'
import { serieActions } from '~/store/studio/serie/actions'
import dataTableMixin from '~/mixins/components/table'
import fileMixin from '~/mixins/file'
import ImageUploader from '~/components/common/Templates/Input/ImageUploader.vue'
export default {
  name: 'Home',
  meta: {
    config,
  },
  layout: 'studio',

  middleware: [
    'auth',
    ({ store, query }) => {
      if (qs.stringify(query) !== '') {
        // Looking for numeric string and convert them to Number
        Object.keys(query).forEach((key, index) => {
          if (!isNaN(query[key])) {
            query[key] = Number(query[key])
          }
        })
        store.commit(moduleMutations.SET.QUERY, query)
      }
    },
  ],
  components: { ImageUploader },
  mixins: [dataTableMixin, fileMixin],
  props: {
    episode: {
      type: Object,
      default: () => {},
    },
  },
  async fetch() {
    this.serie = await this.fetchSerie()
  },
  data() {
    return {
      moduleMutations,
      moduleActions,
      fileList: [],
      episodeModel: {
        name: '',
      },
    }
  },
  computed: mapState({
    serie: (state) => state.studio.serie.data,
  }),
  watch: {
    episode: {
      handler() {
        this.episodeModel = { ...this.episode }
      },
    },
  },

  methods: {
    async handleSubmit() {
      console.log('submiittttttttttttttttttt')
      await this.uploadFilesToS3(this.fileList, 'avatar')

      // await this.submitSingle({
      //   ...this.episodeModel,
      // })
    },
    ...mapActions({
      submitSingle: moduleActions.SUBMIT.SINGLE,
      fetchSerie: serieActions.FETCH.DATA,
    }),
    ...mapMutations({
      setSelectedSerie: moduleMutations.SET.SELECTED,
    }),
  },
  head() {
    return {
      title: 'Episode',
    }
  },
}
</script>
<style lang="scss"></style>
