import { Message } from 'element-ui'
export default function ({ $axios, app }, inject) {
  // Create a custom axios instance
  const clientApi = $axios.create({
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
  clientApi.onRequest((config) => {
    config.url = config.url.replaceAll(/(&|)+(lang=vi|lang=en)/g, '')
    if (process.env.NODE_ENV === 'development') {
      Message('DevOnly | Client API executed')
    }
    // Must return config
    return config
  })
  clientApi.onError((error) => {
    // Must be customized base on your API error structure
    Message.error(app.i18n.t('error.' + error.response.data.code))
    // error.response.data.message.forEach((message) => {
    //   console.log('123123')
    //   Message.error(app.i18n.t('error.' + message.code))
    // })
  })

  // Inject to context as $clientApi
  inject('clientApi', clientApi)
}
