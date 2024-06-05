import { defineStore } from 'pinia'
import axios from '~~/plugins/axios'
import { useUserStore } from './user'
import { useGeneralStore } from './general'
const $axios = axios().provide.axios



export const useAdminStore = defineStore('admin', {
    state: () => ({
        allUsers: null,
        allEventos: null,
        academia: null
       
      }),

      actions: {
         async getAllUsers() {
          
         
                let res = await $axios.get('/api/users')
                this.allUsers = res.data.users
          
           
         },

         async marcarFalta(userId, eventoId) {
             await $axios.post(`/api/events/${userId}/miss/${eventoId}`);

         },

         async marcarPresenca(userId, eventoId) {
            await $axios.post(`/api/events/${userId}/presenca/${eventoId}`);
            
        },

        async getAcademia() {
         let res  = await $axios.get('/api/academia/getacademia')
         this.academia = res.data.academia
        
        },

        async updateAcademia(payload) {
       
           await $axios.put('/api/academia/update', payload)
         
           this.getAcademia()
         
        },

        async removeDate(date) {
      await $axios.patch('/api/academia/removerdata', {
         date: date
        })
      
        },

        async addDate(date, start_hour, end_hour) {
         await $axios.patch('/api/academia/adicionardata', {
            date: date,
            start_hour: start_hour,
            end_hour: end_hour
           })
         
           },

         async getAllAgendamentos() {
           let res = await $axios.get('/api/getall')
           this.allEventos = res.data.events
         },
         async addUser(name, email, ra, role) {
          
        
             await $axios.post('/api/users/create', {
                name: name,
                email: email,
                ra: ra,
                role: role

              })
             
              await this.getAllUsers()
          
         },
         async makeUser(id) {
             
            await $axios.patch(`/api/makeuser/${id}`)
            await this.getAllUsers()
         },
         async makeAdmin(id) {
            await $axios.patch(`/api/makeadmin/${id}`)
            await this.getAllUsers()
         },

         async block(id) {
            await $axios.patch(`/api/block/${id}`)
            await this.getAllUsers()
         },
         async unblock(id) {
            await $axios.patch(`/api/unblock/${id}`)
            await this.getAllUsers()
         },
      },

    

    persist: true
})