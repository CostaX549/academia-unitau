import { defineStore } from 'pinia'
import axios from '~~/plugins/axios'
import { useAdminStore } from './admin'
import { useGeneralStore } from './general'

const $axios = axios().provide.axios

export const useUserStore = defineStore('user', {
  state: () => ({
    id: '',
    name: '',
    email: '',
    image: '',
    ra: '',
    is_admin: false,
    is_blocked: false,
    allAgendamentos: null,
    
    isMobile: false,
    faltas: null,
    addLinkOverlay: false,
    isPreviewOverlay: false,
   
  }),
  actions: {
    hidePageOverflow(val, id) {
      if (val) {
        document.body.style.overflow = 'hidden'
        if (id) {
          document.getElementById(id).style.overflow  = 'hidden'
        }
        return
      }
      document.body.style.overflow = 'visible'
      if (id) {
        document.getElementById(id).style.overflow  = 'visible'
      }
    },

    allLowerCaseNoCaps(str) {
      return str.split(' ').join('').toLowerCase()
    },

    async hasSessionExpired() {
      await $axios.interceptors.response.use((response) => {
        // Call was successful, continue.
        return response;
      }, (error) => {
          switch (error.response.status) {
              case 401: // Not logged in
              case 419: // Session expired
              case 503: // Down for maintenance
                  // Bounce the user to the login screen with a redirect back
                  this.resetState()
                  window.location.href = '/';
                  break;
              case 500:
                  alert('Oops, something went wrong!  The team has been notified.');
                  break;
              default:
                  // Allow individual requests to handle other errors
                  return Promise.reject(error);
          }
      });
    },

    async getTokens() {
await $axios.get('/sanctum/csrf-cookie')
  
    },

    async login(email, password) {
      await $axios.post('/login', {
        email: email,
        password: password
      })
    },

   

    async addAgendamento(date, time) {
        await $axios.post('/api/events/create', {
          date: date,
          time: time
        })
    },

    async getVagas(date, time) {
   
      let res = await $axios.patch("/api/getVagas", {
        date: date,
        time: time
      })
      return res.data.vagas;
    },

    async cancelarAgendamento(id) {
      await $axios.patch(`/api/events/cancelaragendamento/${id}`)
    },

    async register(formData) {
     
      await $axios.post('/register', formData);
    },

    async getUser() {
      let res = await $axios.get('/api/user')
     
      this.$state.id = res.data.data.id
      
      this.$state.is_admin = res.data.data.is_admin === 0 ? false : true;  
      this.$state.name = res.data.data.name
      this.$state.email = res.data.data.email
      this.$state.image = res.data.data.image
      this.$state.ra = res.data.data.ra
      this.$state.is_blocked = res.data.data.is_blocked === 0 ? false : true;
      this.$state.faltas = res.data.data.faltas
      
     


    
    },

    async updateUserImage(data) {
      await $axios.post('/api/user-image', data)
    },

  

  

    async updateUserDetails(name, bio) {
      await $axios.patch(`/api/users/${this.$state.id}`, {
        name: name,
        bio: bio
      })
    },

  

    async getAllAgendamentos() {
      let res = await $axios.get('/api/events/get')
      this.$state.allAgendamentos = res.data.events
    },

  
    
  

    async logout() {
      await $axios.post('/logout')
      this.resetState()
    },

    resetState() {      
      const generalStore = useGeneralStore()
      this.$state.id = ''
      this.$state.name = ''
      this.$state.email = ''
      this.$state.allAgendamentos = null,
      this.$state.is_admin = false
      this.$state.is_blocked = false
      this.$state.image = '',
      this.$state.addLinkOverlay = false,
     
      generalStore.disabledDays = null
      if(this.is_admin) {
        const adminStore = useAdminStore()
   
      adminStore.allUsers = null,
      adminStore.allEventos = null,
      adminStore.academia = null
    }
  

   
     
    },
  },
  persist: true
})