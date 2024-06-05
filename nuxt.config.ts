// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  css: ['~/assets/css/main.css'],
  modules: [
    'nuxt-icon',
    '@pinia/nuxt',
    'nuxt-lodash',
    '@pinia-plugin-persistedstate/nuxt',
    "@samk-dev/nuxt-vcalendar",
   
  ],

  app: {
    head: {
      link: [{ rel: 'icon', type: 'image/png', href: "/img/unitau (1).png" }]
   }
},
  plugins: [
    '~/plugins/vue-tailwind-datepicker.js'
  ],
  build: {
    transpile: ['pinia-plugin-persistedstate'],
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  
})