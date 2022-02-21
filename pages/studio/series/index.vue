<template>
  <el-main class="p-8">
    <DataTable
      v-loading="$fetchState.pending"
      :data="data"
      :total="dataTotal"
      :limit="dataQuery.limit"
      :current-page="dataQuery.offset / dataQuery.limit + 1"
      :multiple-choice="false"
      :actions="serieTableActions"
      @my-table-on-action="handleTableEvents"
      @my-table-edit="onEdit"
      @my-table-delete="onDelete"
      @my-table-add-new="onAdd"
    >
      <el-table-column type="index" label="ID" width="50" />
      <el-table-column :label="'Name'" prop="name" />
      <el-table-column :label="'Rating Count'" prop="ratingCount" />
      <el-table-column :label="'Rating'" prop="rating" />
      <el-table-column :label="'Release At'" prop="createdAt" />
    </DataTable>
    <SerieModel :key="1" :serie="selectedSerie" />
  </el-main>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import qs from 'qs'
import { config } from './config'
import { DataTable } from '~/components/common/Templates/Table'
import { serieMutations as moduleMutations } from '~/store/studio/serie/mutations'
import { serieActions as moduleActions } from '~/store/studio/serie/actions'
import dataTableMixin from '~/mixins/components/table'
import { SerieModel } from '~/components/uncommon/Member/index'
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
    SerieModel,
  },
  mixins: [dataTableMixin],
  data() {
    return {
      moduleMutations,
      moduleActions,
      fileList: [],
      serieTableActions: [
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
      selectedSerie: {
        name: '',
        desccription: '',
      },
    }
  },
  computed: mapState({
    data: (state) => state.serie.data,
    dataQuery: (state) => state.serie.query,
    dataTotal: (state) => state.serie.total,
  }),
  methods: {
    ...mapActions({
      deleteSingle: moduleActions.DELETE.SINGLE,
    }),
    onEdit(payload) {
      this.selectedSerie = {
        name: payload.rowData.name,
        description: this.data.find((x) => x.id === payload.rowData.id)
          .description,
        id: payload.rowData.id,
      }
      this.openModalForm()
    },
    onAdd() {
      this.selectedSerie = {
        name: '',
        description: '',
      }
      this.openModalForm()
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
      this.$root.$emit('my-dialog-show', 'serie-updater')
    },
  },
  head() {
    return {
      title: 'Series',
    }
  },
}
</script>
