<template>
  <el-main class="p-8">
    <DataTable
      v-loading="$fetchState.pending"
      :data="data"
      :total="dataTotal"
      :limit="dataQuery.limit"
      :current-page="dataQuery.offset / dataQuery.limit + 1"
      :multiple-choice="false"
      :actions="episodeTableActions"
      @my-table-on-action="handleTableEvents"
      @my-table-edit="onEdit"
      @my-table-delete="onDelete"
      @my-table-add-new="onAdd"
    >
      <el-table-column type="index" label="ID" width="50" />
      <el-table-column :label="'Name'" prop="name" />
      <el-table-column :label="'Serie'" prop="serie.name" />
      <el-table-column :label="'audio Length'" prop="audioLength" />
      <el-table-column :label="'Release At'" prop="releaseDate" />
    </DataTable>
    <EpisodeModal :key="1" :episode="selectedEpisode" />
  </el-main>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import qs from 'qs'
import moment from 'moment'
import { config } from './config'
import { DataTable } from '~/components/common/Templates/Table'
import { episodeMutations as moduleMutations } from '~/store/studio/episode/mutations'
import { episodeActions as moduleActions } from '~/store/studio/episode/actions'
import dataTableMixin from '~/mixins/components/table'
import { EpisodeModal } from '~/components/uncommon/Member/index'
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
  components: {
    DataTable,
    EpisodeModal,
  },
  mixins: [dataTableMixin],
  data() {
    return {
      moduleMutations,
      moduleActions,
      fileList: [],
      episodeTableActions: [
        {
          name: 'view',
          label: 'table.view',
          permission: ['ALL'],
        },
        {
          name: 'edit',
          label: 'table.edit',
          permission: ['ALL'],
        },
        {
          name: 'delete',
          label: 'table.delete',
          permission: ['ALL'],
        },
      ],
      selectedEpisode: {
        name: '',
        desccription: '',
      },
    }
  },
  computed: mapState({
    data: (state) => {
      let epData = state.studio.episode.data
      epData = epData.map((x) => {
        let releaseDate = ''
        let audioLength = ''
        const time = x.audioLength
        if (time >= 60 && time <= 3600) {
          let minutes = Math.floor(time / 60)
          let seconds = time - minutes * 60
          audioLength = `${
            minutes >= 10 ? minutes : ' 0' + minutes.toString()
          } min ${seconds >= 10 ? seconds : ' 0' + seconds.toString()} sec`
        } else if (time >= 3600) {
          let hours = Math.floor(time / 3600)
          let minutes = Math.floor(time / 60)
          let seconds = time - minutes * 60
          x.audioLength = `${
            hours >= 10 ? hours : ' 0' + hours.toString()
          } hour ${minutes >= 10 ? minutes : ' 0' + minutes.toString()}:${
            seconds >= 10 ? seconds : ' 0' + seconds.toString()
          } min`
        } else {
          audioLength = `${time} sec`
        }
        releaseDate = moment(x.releaseDate).format('DD MMM YY')
        return { ...x, audioLength, releaseDate }
      })
      return epData
    },
    dataQuery: (state) => state.studio.episode.query,
    dataTotal: (state) => state.studio.episode.total,
  }),
  methods: {
    ...mapActions({
      deleteSingle: moduleActions.DELETE.SINGLE,
    }),
    onEdit(payload) {
      this.selectedEpisode = {
        name: payload.rowData.name,
        description: this.data.find((x) => x.id === payload.rowData.id)
          .description,
        id: payload.rowData.id,
      }
      this.openModalForm()
    },
    onAdd() {
      this.selectedEpisode = {}
      this.$router.push('/studio/episode/create')
    },
    onDelete(payload) {
      try {
        this.confirmAction(async () => {
          await this.deleteSingle(payload.rowData.id)
          this.$fetch()
        })
      } catch (error) {
        //
      }
    },

    openModalForm() {
      this.$root.$emit('my-dialog-show', 'episode-updater')
    },
  },
  head() {
    return {
      title: 'Episode',
    }
  },
}
</script>
