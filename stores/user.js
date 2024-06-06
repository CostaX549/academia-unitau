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
     let res = await $axios.get('/sanctum/csrf-cookie')
     console.log(res)
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

    async cancelarAgendamento(id) {
      await $axios.patch(`/api/events/cancelaragendamento/${id}`)
    },

    async register(name, email, ra, password, confirmPassword) {
      await $axios.post('/register', {
        name: name,
        email: email,
        ra: ra,
        password: password,
        password_confirmation: confirmPassword
      })
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