<template>
    <MainLayout>
        <div 
            id="ApperancePage" 
            class="flex h-[calc(100%-50px)] pb-4"
        >
            <div class="lg:w-[calc(100%-500px)] md:w-[calc(100%-330px)] w-full md:pt-20 pt-14">
                <div class="max-w-[750px] mx-auto pb-24">

                    <div id="ProfileSection">
                        <div
                            class="font-semibold pb-4"
                            :class="userStore.isMobile ? 'mt-8 text-2xl' : 'mt-20 md:mt-8 text-xl'"
                        >
                            Perfil
                        </div>
                        
                        <div class="w-full bg-white rounded-3xl p-6">
                            <div class="flex items-center justify-between gap-4">
                                <img 
                                    class="rounded-full w-[90px]"
                                   :src="userStore.image"
                                >

                                <div class="w-full">
                                    <button 
                                        @click="openCropper = true"
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
                                        "
                                    >
                                        Escolha uma imagem
                                    </button>
                                </div>
                            </div>

                            <div class="mt-4">
                                <TextInput 
                                    placeholder="Nome"
                                    v-model:input="name"
                                    inputType="text"
                                    :max="25"
                                    :error="errors && errors.name ? errors.name[0] : ''"
                                />
                            </div>

                            <textarea 
                                v-model="bio" 
                                rows="4"
                                maxlength="80"
                                placeholder="Bio"
                                @focus="isBioFocused = true"
                                @blur="isBioFocused = false"
                                :class="isBioFocused ? 'border-gray-900' : ''"
                                class="
                                    w-full
                                    mt-4
                                    bg-[#EFF0EB]
                                    text-gray-800
                                    border-2
                                    text-sm
                                    border-[#EFF0EB]
                                    rounded-xl
                                    py-3.5
                                    px-3
                                    placeholder-gray-500
                                    resize-none
                                    focus:outline-none
                                "
                            ></textarea>
                            <div class="flex items-center justify-end text-[#676B5F] text-[13px]">
                                {{ bioLengthComputed }}/80
                            </div>

                        </div>
                    </div>

                   
                </div>
            </div>

            <CropperModal 
                v-if="openCropper"
                @data="data = $event"
                @close="openCropper = false"
            />

        </div>
    </MainLayout>
</template>

<script setup>
import MainLayout from '~~/layouts/MainLayout.vue';
import { useUserStore } from '~~/stores/user'
const userStore = useUserStore()


definePageMeta({ middleware: [ 'is-logged-out', 'is-blocked-in' ] })
let name = ref('')
let bio = ref('')
let data = ref(null)
let errors = ref('')
let isBioFocused = ref(false)
let openCropper = ref(false)
useHead({
  title: "Perfil"
})
onMounted(() => {
    name.value = userStore.name
  
})

const updateTheme = async (themeId) => {
    try {
        await userStore.updateTheme(themeId)
    } catch (error) {
        console.log(error)
    }
}



const bioLengthComputed = computed(() => {
    return !bio.value ? 0 : bio.value.length
})

const updateUserImage = async () => {
    try {
        await userStore.updateUserImage(data.value)
        await userStore.getUser()
        setTimeout(() => openCropper.value = false, 300)
    } catch (error) {
        openCropper.value = false
        alert(error)
        console.log(error)
    }
}


watch(() => data.value, async () => await updateUserImage())
</script>