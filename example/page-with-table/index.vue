<template>
  <el-main class="p-8">
    <Breadcrumb :title="$t('example.title')" />
    <DataTable
      v-loading="$fetchState.pending"
      :data="data"
      :total="dataTotal"
      :limit="dataQuery.limit"
      :current-page="dataQuery.offset / dataQuery.limit + 1"
      :multiple-choice="false"
      :actions="exampleTableActions"
      @my-table-on-action="handleTableEvents"
      @my-table-edit="onEdit"
      @my-table-delete="onDelete"
      @my-table-add-new="$router.push(`/${roleGroup}/example/create`)"
    >
      <el-table-column type="index" label="STT" width="50" />
      <el-table-column :label="$t('example.index.title')" prop="title" />
      <el-table-column :label="$t('example.index.author')" prop="user">
        <template slot-scope="scope">
          {{ scope.row.user.name }}
        </template>
      </el-table-column>
    </DataTable>
  </el-main>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import qs from 'qs'
import { config } from './config'
import { DataTable } from '~/components/common/Templates/Table'
import { Breadcrumb } from '~templates/Breadcrumb'
import { exampleMutations as moduleMutations } from '~/store/example/mutations'
import { exampleActions as moduleActions } from '~/store/example/actions'
import dataTableMixin from '~/mixins/components/table'
export default {
  name: 'Home',
  meta: {
    config,
  },
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
    Breadcrumb,
  },
  mixins: [dataTableMixin],
  data() {
    return {
      moduleMutations,
      moduleActions,
      fileList: [],
      exampleTableActions: [
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
    }
  },
  computed: mapState({
    data: (state) => state.example.data,
    dataQuery: (state) => state.example.query,
    dataTotal: (state) => state.example.total,
  }),
  methods: {
    ...mapActions({
      deleteSingle: moduleActions.DELETE.SINGLE,
    }),
    onEdit(payload) {
      this.$router.push(`/${this.roleGroup}/example/edit/${payload.rowData.id}`)
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
  },
  head() {
    return {
      title: this.$t('example.title'),
    }
  },
}
</script>
