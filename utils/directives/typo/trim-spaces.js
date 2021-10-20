export default {
  bind(el, binding) {
    const input =
      el.getElementsByTagName('input')[0] ||
      el.getElementsByTagName('textarea')[0]
    input.addEventListener('input', function (event) {
      if (event.target.value === ' ') {
        event.target.value = ''
      } else {
        // Replace continous spaces
        event.target.value = event.target.value.replaceAll(/\s\s+/g, ' ')
      }
    })
  },
}
