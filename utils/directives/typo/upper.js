import { toUpper } from 'lodash'
export default {
  update(el, binding) {
    const input = el.getElementsByTagName('input')[0]
    input.addEventListener('input', function (event) {
      event.target.value = toUpper(event.target.value)
    })
  },
}
