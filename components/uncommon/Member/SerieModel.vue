<template>
  <DialogWrapper
    id="serie-updater"
    title="Chỉnh Sửa Thông Tin"
    width="800px"
    :center="true"
  >
    <FormWrapper :model="serieModel" @onSubmit="handleSubmit">
      <div class="flex">
        <div class="flex-1 ml-5">
          <InputWrapper rules="required" prop="name">
            <span slot="label" class="text-md font-medium">
              <fa :icon="['fas', 'user']" class="text-lg text-theme-1" />
              Serie Name
            </span>
            <el-input
              v-model="serieModel.name"
              maxlength="100"
              placeholder="enter serie name"
            ></el-input>
          </InputWrapper>

          <InputWrapper rules="required" prop="description">
            <span slot="label" class="text-md font-medium">
              <fa :icon="['fas', 'user']" class="text-lg text-theme-1" />
              Description
            </span>
            <el-input
              v-model="serieModel.description"
              type="textarea"
              :rows="6"
              placeholder="enter description"
            ></el-input>
          </InputWrapper>
        </div>
      </div>

      <el-button
        v-if="!serie.id"
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
import { serieActions } from '~/store/serie/actions'
import { serieMutations } from '~/store/serie/mutations'

export default {
  name: 'SerieModel',
  components: {
    FormWrapper,
    DialogWrapper,
    InputWrapper,
  },
  props: {
    serie: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return { serieModel: {} }
  },
  watch: {
    serie: {
      handler() {
        this.serieModel = { ...this.serie }
      },
    },
  },
  methods: {
    async handleSubmit() {
      delete this.serieModel.id
      if (this.serie.id) {
        await this.updateSerieAsync({
          id: this.serie.id,
          form: {
            ...this.serieModel,
          },
        })
      } else {
        await this.createSerieAsync({
          ...this.serieModel,
        })
      }
      this.$root.$emit('my-dialog-hide', 'serie-updater')
      await this.fetchSerieAsync()
    },
    ...mapActions({
      updateSerieAsync: serieActions.UPDATE.SINGLE,
      createSerieAsync: serieActions.SUBMIT.SINGLE,
      fetchSerieAsync: serieActions.FETCH.DATA,
    }),
    ...mapMutations({
      setSelectedSerie: serieMutations.SET.SELECTED,
    }),
  },
}
</script>
