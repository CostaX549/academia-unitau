<template>
    <AuthLayout>
      <div class="mt-10">
        <h1 class="lg:text-5xl text-3xl text-blue-500 text-center font-extrabold">
          Redefinir Senha
        </h1>
  
        <form class="mt-12" @submit.prevent="resetPassword()">
          <div>
            <TextInput
              placeholder="Nova Senha"
              v-model:input="password"
              inputType="password"
              :error="errors && errors.password ? errors.password[0] : ''"
            />
          </div>
          <div class="mt-5">
            <TextInput
              placeholder="Confirme a Nova Senha"
              v-model:input="passwordConfirmation"
              inputType="password"
              :error="errors && errors.email ? errors.email[0] : ''"
            />
          </div>
          <div class="mt-5">
            <button
              type="submit"
              class="rounded-full w-full p-3 font-bold"
              :disabled="!password || !passwordConfirmation"
              :class="
                password && passwordConfirmation
                  ? 'bg-blue-500 hover:bg-blue-600 text-white'
                  : 'bg-[#EFF0EB] text-[#A7AAA2]'
              "
            >
              Redefinir Senha
            </button>
          </div>
        </form>
        
        <!-- Adicionando o status -->
        <div v-if="status" class="mt-5">
        <div class="p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg" role="alert">
          {{ status }}
          <NuxtLink to="/" class="text-green-700 underline">Ir para o Login</NuxtLink>
        </div>
      </div>
      </div>
    </AuthLayout>
  </template>
<script setup>


import AuthLayout from '~/layouts/AuthLayout.vue';
import { useUserStore } from '~~/stores/user';

const userStore = useUserStore();
const route = useRoute();
const router = useRouter();

let password = ref(null);
let passwordConfirmation = ref(null);
let errors = ref(null);
let status = ref(null);



const resetPassword = async () => {
  errors.value = null;
  const token = route.params.token;
  const email = route.query.email;

  try {
    await userStore.getTokens();
    let res = await userStore.resetPassword(token, email, password.value, passwordConfirmation.value);
    status.value = res.data.status;
   
 
  } catch (error) {
    console.log(error)
        errors.value = error.response.data.errors;
  }
};

useHead({
  title: "Redefinir Senha"
});
</script>
  