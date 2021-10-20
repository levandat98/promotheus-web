import { Message } from 'element-ui'
export default ({ app }, inject) => {
  const dev = {
    log: (...args) => {
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.log(...args)
      }
    },
    error: (...args) => {
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.error(...args)
      } else {
        // eslint-disable-next-line no-console
        console.error('Error')
      }
    },
    message: {
      success: (text = '') => {
        if (process.env.NODE_ENV === 'development') {
          Message.success(text)
        }
      },
      error: (text = '') => {
        if (process.env.NODE_ENV === 'development') {
          Message.error(text)
        } else {
          Message.error('Error')
        }
      },
    },
  }
  inject('dev', dev)
}
