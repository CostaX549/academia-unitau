<template>
    <AuthLayout>
        <div class="mt-10">
            <h1 class="lg:text-5xl text-3xl text-blue-500 text-center font-extrabold">
            Crie sua conta
            </h1>

            <form 
                class="mt-12" 
                @submit.prevent="register()"
            >
                <div>
                    <TextInput 
                        placeholder="Usuário"
                        v-model:input="name"
                        inputType="text"
                        :error="errors && errors.name ? errors.name[0] : ''"
                    />
                </div>

                <div  class="mt-4"  >
                    <TextInput 
                        placeholder="Email: unitau@gmail.com"
                        v-model:input="email"
                        inputType="email"
                        :error="errors && errors.email ? errors.email[0] : ''"
                    />
                </div>

                <div  class="mt-4"  >
                    <TextInput 
                        placeholder="RA"
                        v-model:input="ra"
                        inputType="text"
                        :error="errors && errors.ra ? errors.ra[0] : ''"
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

                <div class="mt-4">
                    <TextInput 
                        placeholder="Confirmar Senha"
                        v-model:input="confirmPassword"
                        inputType="password"
                    
                    />
                </div>

            


                <div class="mt-10">
                    <button
                        type="submit"
                        class="rounded-full w-full p-3 font-bold"
                        :disabled="(!name || !email || !password || !confirmPassword || !ra) "
                        :class="
                            (name && email && password && confirmPassword) 
                                ? 'bg-blue-500 hover:bg-blue-600 text-white' 
                                : 'bg-[#EFF0EB] text-[#A7AAA2]'
                        "
                    >
                    Registrar
                    </button>
                </div>
            </form>

            <div class="text-[14px] text-center pt-12">
           Já possui uma conta?
                <NuxtLink 
                    to="/"
                    class="text-blue-500 underline"
                >
                Log in
                </NuxtLink>
            </div>
        </div>
    </AuthLayout>
</template>
<script setup>
import AuthLayout from '~~/layouts/AuthLayout.vue';
import { useUserStore } from '~~/stores/user';
const userStore = useUserStore()
import { useAdminStore } from '~/stores/admin';
const adminStore = useAdminStore();

definePageMeta({   middleware: 'is-logged-in' })
useHead({
  title: "Registrar"
})
const router = useRouter()

let name = ref(null)
let email = ref(null)
let password = ref(null)
let confirmPassword = ref(null)
let ra = ref(null)
let errors = ref(null)


const register = async () => {
    errors.value = null

    try {
        await userStore.getTokens()
        await userStore.register(
            name.value, 
            email.value, 
            ra.value,
            password.value, 
            confirmPassword.value
        )
        await userStore.getUser()
       
        if(userStore.is_admin) {
            await adminStore.getAcademia()
            await adminStore.getAllAgendamentos()
            router.push('/admin')
        } else {
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

</script>