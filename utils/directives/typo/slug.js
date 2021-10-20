import slug from 'slug'
// Must be put on top of v-upper because this will lower every letter down
export default {
  bind(el, binding) {
    const input = el.getElementsByTagName('input')[0]
    input.addEventListener('input', function (event) {
      event.target.value = slug(event.target.value)
    })
  },
}
