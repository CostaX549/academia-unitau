import { defineNuxtPlugin } from '#app'
import VueTailwindDatepicker from 'vue-tailwind-datepicker'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('VueTailwindDatepicker', VueTailwindDatepicker)
})