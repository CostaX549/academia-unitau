import { useUserStore } from '~~/stores/user'

export default defineNuxtRouteMiddleware((to, from) => {
    const userStore = useUserStore()
    
    if (to.fullPath === '/' && userStore.id) {
        if(!userStore.is_admin) {
            return navigateTo('/home')
        } else {
            return navigateTo('/admin')
        }
       
    }

    if (to.fullPath === '/register' && userStore.id) {
        if(!userStore.is_admin) {
            return navigateTo('/home')
        } else {
            return navigateTo('/admin')
        }
    }
})