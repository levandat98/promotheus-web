export default {
  methods: {
    // Pop up to confirm
    confirmAction(success, fail = () => {}, title = null, message = null) {
      this.$confirm(
        message || this.$t('table.confirm-warning'),
        title || this.$t('table.confirm-title'),
        {
          confirmButtonText: this.$t('table.confirm-ok'),
          cancelButtonText: this.$t('table.confirm-abort'),
          type: 'warning',
        }
      )
        .then(() => {
          try {
            success()
          } catch (err) {
            throw new Error(
              'The first argument of confirmAction must be function'
            )
          }
        })
        // Choose cancel
        .catch(() => {
          try {
            fail()
          } catch (err) {
            // Nothing happen
          }
        })
    },
  },
}
