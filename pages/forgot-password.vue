<template>
    <AuthLayout>
        <div class="mt-10">
            <h1 class="lg:text-5xl text-3xl text-blue-500 text-center font-extrabold">
                Informe seu email
            </h1>

            <form 
                class="mt-12" 
                @submit.prevent="recuperar()"
            >
                <div>
                    <TextInput 
                        placeholder="Email: unitau@gmail.com"
                        v-model:input="email"
                        inputType="email"
                        :error="errors && errors.email ? errors.email[0] : ''"
                    />
                </div>
                <div class="mt-5">
                    <button
                        type="submit"
                        class="rounded-full w-full p-3 font-bold"
                        :disabled="(!email) "
                        :class="
                            (email) 
                                ? 'bg-blue-500 hover:bg-blue-600 text-white' 
                                : 'bg-[#EFF0EB] text-[#A7AAA2]'
                        "
                    >
                    Recuperar Senha
                    </button>
                </div>
            </form>
            
            <!-- Adicionando o status -->
            <div v-if="status" class="mt-5">
                <div class="p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg" role="alert">
                    {{ status }}
                </div>
            </div>
        </div>
    </AuthLayout>
</template>

<script setup>

import AuthLayout from '~/layouts/AuthLayout.vue';
import { useUserStore } from '~~/stores/user';

const userStore = useUserStore()

definePageMeta({ middleware: 'is-logged-in'})

let email = ref(null)
let errors = ref(null)
let status = ref(null)

const recuperar = async () => {
    errors.value = null
   try {
     await userStore.getTokens()
     let res = await userStore.forgotpassword(email.value)
    
     status.value = res.data.status
   } catch(error) {
    console.log(error)
    errors.value = error.response.data.errors
   }
}

useHead({
  title: "Recuperar Senha"
})

</script>
