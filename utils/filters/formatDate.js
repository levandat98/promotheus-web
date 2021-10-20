export default (val, locale = 'vi') => {
  const moment = require('moment')
  moment.locale(locale)
  return val ? moment(val).format('DD/MM/YYYY') : ''
}
