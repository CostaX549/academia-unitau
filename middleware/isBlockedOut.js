import { useUserStore } from '~~/stores/user'

export default defineNuxtRouteMiddleware((to, from) => {
    const userStore = useUserStore()
  
    if (userStore.is_blocked === false) {
        return navigateTo('/home')
    } 
})