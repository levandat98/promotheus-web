import { FormWrapper, InputWrapper } from '~/components/common/Templates/Form'
export default {
  components: {
    FormWrapper,
    InputWrapper,
  },
  watch: {
    form: {
      deep: true,
      handler() {
        let result = []
        let filters = []
        Object.keys(this?.form).forEach((key, index) => {
          if (this.form[key]) {
            filters.push({
              key: key,
              operator: this.filterMap[key],
              value: this.form[key],
            })
          }
        })
        result = filters.map((filter) =>
          [filter.key, filter.operator, filter.value].join('|')
        )
        this.filter = result === '' ? null : result
      },
    },
  },
  methods: {
    fillFormFromQuery(query) {
      if (query.filter) {
        Object.keys(this.filterMap).forEach((key) => {
          const queryFilter =
            typeof query.filter === 'string'
              ? JSON.parse(query.filter)
              : query.filter
          if (queryFilter[key]) {
            // this.form.fullName = query.filter.fullName.$ilike
            this.form[key] = queryFilter[key][this.filterMap[key]]
          }
        })
      }
    },
  },
}
