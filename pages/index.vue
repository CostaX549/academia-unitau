<template>
    <AuthLayout>
        <div class="mt-10">
            <img src="~/assets/images/logo-unitau.png"  class="mx-auto w-[80px] p-2">
            <div class="flex gap-1 items-center justify-center mt-5">
            <h1 class="text-6xl text-white text-center font-[1000]">
                academia 
            </h1>
            <h1 class="text-6xl  text-white text-center font-light">
                unitau
            </h1>
        </div>
            <form 
                class="mt-12" 
                @submit.prevent="login()"
            >
                <div>
                    <TextInput 
                        placeholder="Email: unitau@gmail.com"
                        v-model:input="email"
                        inputType="email"
                        :error="errors && errors.email ? errors.email[0] : ''"
                    />
                </div>

                <div class="mt-4">
                    <TextInput 
                        placeholder="Senha"
                        v-model:input="password"
                        inputType="password"
                        :error="errors && errors.password ? errors.password[0] : ''"
                    />
                </div>

                <div class="mt-10">
                    <button
                    @click="login()"
                        type="submit"
                        class="rounded-full w-full p-3 font-bold"
                        :disabled="(!email || !password) "
                        :class="
                            (email && password) 
                                ? 'bg-blue-500 hover:bg-blue-600 text-white' 
                                : 'bg-[#EFF0EB] text-[#A7AAA2]'
                        "
                    >
                    <div class="flex items-center justify-center">
          <span >Login</span>
          <span v-if="isLoading"><Icon class="animate-spin ml-1" name="mingcute:loading-line" size="20" /></span>
        </div>
                    </button>
                </div>
            </form>

            <div class="text-[14px] text-center text-white pt-8">
                Não possui uma conta?
                <NuxtLink 
                    to="/register"
                    class="text-white underline"
                >
                    Registrar
                </NuxtLink>
            </div>

            <div class="text-[14px] text-center text-white pt-5">
               Esqueceu a senha?
                <NuxtLink 
                    to="/forgot-password"
                    class="text-white underline"
                >
                    Recuperar Senha
                </NuxtLink>
            </div>
        </div>
    </AuthLayout>
</template>

<script setup>
import AuthLayout from '~/layouts/AuthLayout.vue';

definePageMeta({ middleware: 'is-logged-in'})

const router = useRouter()
import { useUserStore } from '~~/stores/user';
const userStore = useUserStore()
import { useAdminStore } from '~/stores/admin';
const adminStore = useAdminStore();
let email = ref(null)
let password = ref(null)
let errors = ref(null)
import { useGeneralStore } from '~~/stores/general'
const generalStore = useGeneralStore()
let isLoading = ref(false)

const login = async () => {
    errors.value = null
   isLoading.value = true
    try {
        await userStore.getTokens()
        await userStore.login(email.value, password.value)
        await userStore.getUser()
      
        if(userStore.is_admin) {
           
          await adminStore.getAcademia()
          await adminStore.getAllAgendamentos()
          isLoading.value = false
            router.push('/admin')
        } else {
            isLoading.value = false
            if(userStore.is_blocked) {
                router.push('/blocked')
            }
          router.push('/home')
        }
       
    } catch (error) {
        console.log(error)
        errors.value = error.response.data.errors
    }
}
useHead({
  title: "Login"
})

</script>