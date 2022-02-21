<template>
  <DialogWrapper
    id="episode-updater"
    title="Chỉnh Sửa Thông Tin"
    width="800px"
    :center="true"
  >
    <FormWrapper :model="episodeModel" @onSubmit="handleSubmit">
      <div class="flex">
        <div class="flex-1 ml-5">
          <InputWrapper rules="required" prop="name">
            <span slot="label" class="text-md font-medium">
              <fa :icon="['fas', 'user']" class="text-lg text-theme-1" />
              Episode Name
            </span>
            <el-input
              v-model="episodeModel.name"
              maxlength="100"
              placeholder="enter episode name"
            ></el-input>
          </InputWrapper>

          <InputWrapper rules="required" prop="description">
            <span slot="label" class="text-md font-medium">
              <fa :icon="['fas', 'user']" class="text-lg text-theme-1" />
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
      </div>

      <el-button
        v-if="!episode.id"
        type="primary"
        native-type="submit"
        class="w-full"
      >
        Create
      </el-button>
      <el-button v-else type="primary" native-type="submit" class="w-full">
        Update
      </el-button>
    </FormWrapper>
  </DialogWrapper>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'
import { FormWrapper, InputWrapper } from '~/components/common/Templates/Form'
import { DialogWrapper } from '~/components/common/Templates/Dialog'
import { episodeActions } from '~/store/episode/actions'
import { episodeMutations } from '~/store/episode/mutations'

export default {
  name: 'EpisodeModal',
  components: {
    FormWrapper,
    DialogWrapper,
    InputWrapper,
  },
  props: {
    episode: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return { episodeModel: {} }
  },
  watch: {
    episode: {
      handler() {
        this.episodeModel = { ...this.episode }
      },
    },
  },
  methods: {
    async handleSubmit() {
      delete this.episodeModel.id
      if (this.episode.id) {
        await this.updateSerieAsync({
          id: this.episode.id,
          form: {
            ...this.episodeModel,
          },
        })
      } else {
        await this.createSerieAsync({
          ...this.episodeModel,
        })
      }
      this.$root.$emit('my-dialog-hide', 'episode-updater')
      await this.fetchSerieAsync()
    },
    ...mapActions({
      updateSerieAsync: episodeActions.UPDATE.SINGLE,
      createSerieAsync: episodeActions.SUBMIT.SINGLE,
      fetchSerieAsync: episodeActions.FETCH.DATA,
    }),
    ...mapMutations({
      setSelectedSerie: episodeMutations.SET.SELECTED,
    }),
  },
}
</script>
