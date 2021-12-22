/* eslint-disable */
const path = require('path')
require('dotenv').config() // Using .env in nuxt.config.js requires this
export default {
  /*
   ** Nuxt rendering mode
   ** See https://nuxtjs.org/api/configuration-mode
   */
  // mode: 'universal', // Deprecated
  ssr: false,
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: 'server',
  /*
   ** Nuxt server
   ** See https://nuxtjs.org/api/configuration-server
   */
  server: {
    port: process.env.PORT || 3000,
    host: process.env.HOST || `0.0.0.0`,
    /*
     ** Nuxt timing api
     ** See https://nuxtjs.org/api/configuration-server/#using-timing-api
     */
    timing: false,
  },
  /*
   ** Nuxt root directory
   ** See https://nuxtjs.org/api/configuration-srcdir
   */
  srcDir: '',
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    title: 'Promotheus',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'og:description',
        property: 'og:description',
        content:
          'Podcast',
      },
    ],
    
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: 'blue', throttle: 0,  height: '3px' },
  /*
   ** Customize how page and layout transition looks
   */
  layoutTransition: {
    // Is "layout" by default
    name: 'fade',
    mode: 'out-in',
  },
  pageTransition: {
    // Is "page" by default
    name: 'slide-fade',
    mode: 'out-in',
  },
  /*
   ** Global CSS
   */
  css: [
    '~/assets/css/animate.css/all.min.css',
    '~/assets/scss/main.scss', // CSS class customization can cause confliction with other ui package
    '~/assets/css/tailwind-built.css',
    '~/assets/css/animate.min.css',
    '~/assets/css/slick.css',
    '~/assets/css/site.css',
  ],
  /*
   ** Import scss resource in every component
   ** For global color variables, use CSS variables in :root{}
   ** For color configuration, go to ~/assets/scss/base/utitlities/_variants.scss
   */
  styleResources: {
    scss: ['~/assets/scss/base/styleResources/mixins.scss'],
  },
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: [
    // Services
    '~/services/auth.js',
    '~/services/client.js',
    // Plugins
    '~/plugins/element-ui',
    '~/plugins/i18n.js',
    '~/plugins/dev.js',
    '~/plugins/v-calendar.js',
    // Utilities
    '~/utils/index.js',
    //Mixins
    '~/mixins/global.js',
  ],
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: false,
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    '@nuxtjs/tailwindcss',
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    // Doc: https://github.com/nuxt-community/dotenv-module
    // Doc: https://github.com/nuxt-community/dotenv-module#path
    // '@nuxtjs/dotenv',
    ['@nuxtjs/dotenv', { path: './' }],
    [
      'nuxt-fontawesome',
      {
        component: 'fa',
        imports: [
          {
            set: '@fortawesome/free-solid-svg-icons',
            icons: ['fas'],
          },
          {
            set: '@fortawesome/free-brands-svg-icons',
            icons: ['fab'],
          },
          {
            set: '@fortawesome/free-regular-svg-icons',
            icons: ['far'],
          },
        ],
      },
    ],
    '@nuxtjs/style-resources',
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    aseURL: process.env.API_URL || 'http://localhost:3000/',
    retry: { retries: 3 },
  },
  /**
   * Tailwindcss module configuration
   * See https://tailwindcss.nuxtjs.org/options
   */
  tailwindcss: {
    jit: true,
  },
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {
    transpile: [/^element-ui/],
    /*
     ** You can extend webpack config here
     */
    babel: {
      plugins: ['@babel/plugin-proposal-optional-chaining'],
    },
    extend(config, ctx) {
      const alias = (config.resolve.alias = config.resolve.alias || {})
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
          options: {
            fix: true,
          },
        })
      }
      config.node = {
        fs: 'empty',
      }
      alias['~functions'] = path.resolve(__dirname, './utils/functions')
      // Template paths
      const templatePath = './components/common/Templates'
      alias['~templates'] = path.resolve(__dirname, templatePath)
      alias['~dialog'] = path.resolve(__dirname, templatePath + '/Dialog')
      alias['~form'] = path.resolve(__dirname, templatePath + '/Form')
      alias['~input'] = path.resolve(__dirname, templatePath + '/Input')
      alias['~table'] = path.resolve(__dirname, templatePath + '/Table')
    },
  },
  router: {
    // base: '.'
    middleware: ['nuxtServerInit', 'auth'],
  },
  generate: {
    /*
     ** Declare specific routes for static generator
     */
    // routes: [
    //   '/'
    // ]
    /*
     ** Or dynamic routes
     */
    // routes () {
    //   return axios.get('https://my-api/users')
    //     .then((res) => {
    //       return res.data.map((user) => {
    //         return '/users/' + user.id
    //       })
    //     })
    // }
  },
}
