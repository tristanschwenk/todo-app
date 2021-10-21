export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'app',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      // { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/style/style.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '@plugins/dayjs' },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/pwa',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    proxy: true
  },

  proxy: {
    '/api/': {
      target: 'http://localhost:3001',
      pathRewrite: { '^/api/': '/' }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extend(config, ctx) {}
  },

  server: {
    host: "0.0.0.0"
  },

  pwa: {
    icon: {
      fileName: "icon.png"
    },
    meta: {
      mobileAppIOS: true,
      name: "ToDo App",
      author: "Tristan SCHWENK",
      description: "An elegent Todo App to keep things in your mind. Simple design to keep you focus on what is important.",
      lang: "fr"
    },
    manifest: {
      name: 'ToDo App',
      short_name: 'ToDo',
      lang: 'fr',
      description: "An elegent Todo App to keep things in your mind. Simple design to keep you focus on what is important.",
    },
  }

}
