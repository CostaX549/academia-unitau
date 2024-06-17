<template>
    <div class="fixed z-50 h-full">
        <div class="fixed inset-0 bg-black bg-opacity-60"></div>
        <div class="fixed inset-0 z-10 overflow-auto h-full">
            <div class="flex flex-col min-h-full justify-center items-center py-2">

                <div
                    class="
                        transform
                        overflow-hidden
                        rounded-lg
                        bg-white
                        shadow-2xl
                        transition-all
                        max-w-lg
                        w-full
                    "
                >
                    <div class="flex items-center  py-4 border-b border-b-gray-300">
                        <div class="text-[22px] font-semibold w-full text-center">
                            Adicionar Usuário
                        </div>
                        <div
                            @click="$emit('close')"
                            class="absolute right-3 rounded-full p-1.5 bg-gray-200 hover:bg-gray-300 cursor-pointer"
                        >
                            <Icon name="mdi:close" size="25"/>
                        </div>
                    </div>

                    <div class="flex items-center bg-white px-4 pb-4">
                        <div class="w-full">
                            <div class="my-4">
                            <TextInput 
                        placeholder="Nome"
                        v-model:input="name"
                        inputType="text"
                        :error="errors && errors.name ? errors.name[0] : ''"
                    />
                </div> 
                            <div class="my-4">
                            <TextInput 
                        placeholder="Email: unitau@gmail.com"
                        v-model:input="email"
                        inputType="email"
                        :error="errors && errors.email ? errors.email[0] : ''"
                    />
                </div> 

                <div class="my-4">
                            <TextInput 
                        placeholder="RA"
                        v-model:input="ra"
                        inputType="text"
                        :error="errors && errors.ra ? errors.ra[0] : ''"
                    />
                </div> 

                <div class="my-4">
                            <TextInput 
                        placeholder="Curso"
                        v-model:input="curso"
                        inputType="text"
                        :error="errors && errors.curso ? errors.curso[0] : ''"
                    />
                </div> 

                <div class="my-4">
                    <TextInput 
                        placeholder="Período"
                        v-model:input="periodo"
                        inputType="number"
                        :error="errors && errors.periodo ? errors.periodo[0] : ''"
                    />
                </div>

                <div class="flex items-center mb-4">
                                <input id="default-radio-1" type="radio" value="user" v-model="role" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500">
                                <label for="default-radio-1" class="ms-2 text-sm font-medium text-gray-900">Usuário</label>
                            </div>
                            <div class="flex items-center mb-4">
                                <input id="default-radio-2" type="radio" value="admin" v-model="role" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500">
                                <label for="default-radio-2" class="ms-2 text-sm font-medium text-gray-900">Admin</label>
                            </div>

              
                          
                                <button
                                    @click="adicionar()"
                                    class="
                                        flex 
                                        items-center 
                                        justify-center 
                                      
                                        w-full 
                                        py-3 
                                        rounded-full 
                                        text-white 
                                        font-semibold 
                                        bg-blue-500
                                        hover:bg-blue-600
                                        mb-2
                                        cursor-pointer
                                    "
                                >
                                    Adicionar
                                </button>
                       

                           

                            <div class="flex gap-4">
                                <button
                                    @click="$emit('close')"
                                    type="button"
                                    class="
                                        flex 
                                        items-center 
                                        border 
                                        justify-center 
                                        w-full 
                                        py-3 
                                        rounded-full 
                                        text-black 
                                        font-semibold 
                                        hover:bg-gray-100
                                        focus:outline-none
                                        focus:ring-0
                                        cursor-pointer
                                    "
                                >
                                    Cancelar
                                </button>
                                
                               
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
  
  import { useAdminStore } from '~/stores/admin';
    const emit = defineEmits(['close', 'data'])
    const adminStore = useAdminStore();
 
 
    let role = ref('user');
    let email = ref(null)
let name = ref(null)
let errors = ref(null)
let ra  = ref(null)
let curso = ref(null)
let periodo = ref(null)


 
    const adicionar = async() => {
        errors.value = null
      
        try {
          await adminStore.addUser(name.value, email.value, ra.value, role.value, curso.value, periodo.value)
          emit('close')
        } catch (error) {
        console.log(error)
        errors.value = error.response.data.errors
    }

      
    }

 


</script>