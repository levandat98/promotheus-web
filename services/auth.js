import { Message } from 'element-ui'
import { authActions } from '~/store/auth/actions'
export default function ({ $axios, store, app, redirect }, inject) {
  // Create a custom axios instance
  const authApi = $axios.create({
    headers: {
      // 'Access-Control-Allow-Origin': '*',
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: '',
    },
  })
  authApi.onRequest((config) => {
    // .setHeader doesn't work
    // await authApi.setHeader('Authorization', store.state.auth.data.token)
    config.headers.Authorization =
      'Bearer ' + store.state.auth?.data?.accessToken
    if (process.env.NODE_ENV === 'development') {
      Message('DevOnly | Authenticated API executed')
    }
    // Must return config
    return config
  })
  authApi.onError((error) => {
    // Must be customized base on your API error structure
    if (
      error?.response?.status === 401 &&
      localStorage.getItem('auth') !== null &&
      localStorage.getItem('roleGroup') !== null
    ) {
      redirect(`/${store.getters['auth/roleGroup']}/auth/login`)
      store.dispatch(authActions.LOGOUT)
    }
    // Must be customized base on your API error structure
    if (error?.response?.data?.message) {
      Message.error(app.i18n.t('error.' + error.response.data.message))
    }
  })
  // Inject to context as $authApi
  inject('authApi', authApi)
}
