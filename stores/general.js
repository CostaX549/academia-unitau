import { defineStore } from 'pinia'
import axios from '~~/plugins/axios'
import { useUserStore } from './user'

const $axios = axios().provide.axios



export const useGeneralStore = defineStore('general', {
    state: () => ({
   disabledDays: null,
   removedDates: null,
   addedDates: null,

   
       
      }),

      actions: {
         async getDisabledDays() {
          let res  = await $axios.get('/api/disabled-days')
        
          this.disabledDays = res.data.dias
         },

         async getDisponibleHours(date) {
          let res = await $axios.patch('/api/disponible-hours', {
             date: date
          })
          return res
         },
         async getRemovedDates() {
            let res  = await $axios.get('/api/removedates')
          
            this.removedDates = res.data.removedDates
           },

         

           async getAddedDates() {
            let res  = await $axios.get('/api/addeddates')
          
            this.addedDates = res.data.addedDates
           },
      },

    

    persist: true
})