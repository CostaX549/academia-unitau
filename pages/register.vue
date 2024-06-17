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

            
                <div class="mt-4">
                    <TextInput 
                        placeholder="Curso"
                        v-model:input="curso"
                        inputType="text"
                        :error="errors && errors.curso ? errors.curso[0] : ''"
                    />
                </div>

                <div class="mt-4">
                    <TextInput 
                        placeholder="Período"
                        v-model:input="periodo"
                        inputType="number"
                        :error="errors && errors.periodo ? errors.periodo[0] : ''"
                    />
                </div>

                <div class="mt-4">
                    <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-password">
          Anexar documento da academia
        </label>
                    <label for="file-input" class="sr-only">Anexar documento</label>
                    <input type="file" name="file-input" id="file-input" accept=".pdf, image/*" @change="handleFileChange" class="block w-full border border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none file:bg-gray-50 file:border-0 file:me-4 file:py-3 file:px-4">
                    <span v-if="errors && errors?.documento" class="text-red-500 text-[14px] font-semibold">
                  {{ errors?.documento[0]  }}
                 </span>
                </div>

                <div class="mt-10">
                    <button
                        type="submit"
                        class="rounded-full w-full p-3 font-bold"
                        :disabled="(!name || !email || !password || !confirmPassword || !ra || !curso || !periodo || !file) "
                        :class="
                            (name && email && password && confirmPassword && ra && curso && periodo && file) 
                                ? 'bg-blue-500 hover:bg-blue-600 text-white' 
                                : 'bg-[#EFF0EB] text-[#A7AAA2]'
                        "
                    >
                    Registrar
                    </button>
                </div>
            </form>

            <div class="text-[14px] text-center pt-5">
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
let curso = ref(null)
let periodo = ref(null)
let file = ref(null)

const handleFileChange = (event) => {
    file.value = event.target.files[0];
}

const register = async () => {
    errors.value = null

    const formData = new FormData();
  formData.append('name', name.value);
  formData.append('email', email.value);
  formData.append('ra', ra.value);
  formData.append('password', password.value);
  formData.append('password_confirmation', confirmPassword.value);
  formData.append('curso', curso.value);
  formData.append('periodo', periodo.value);
  formData.append('documento', file.value);

    try {
        await userStore.getTokens()
        await userStore.register(
            formData
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