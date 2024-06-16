<template>
    <div :id="`LinkBox${link.id}`" class="w-full bg-white rounded-3xl">
         <div id="MainLinkBoxSection" class="px-8 py-5">
          <h1 class="text-[15px] font-semibold pb-2 truncate">Agendamento para {{  link.datetime }} - {{  link.time }}</h1>
          <h1 class="text-[15px] font-semibold pb-2 truncate">Telefone Academia: {{  link.academia.phone }}</h1> 
      
           <div class="flex flex-col items-center justify-between py-1">
       
           </div>
           <div class="flex items-center justify-end py-1 mt-4">
              
               <div class="flex items-center">
                  <div class="flex items-center px-1.5 py-[2px] rounded-md relative ">
                   <button
                   @click="isDelete = true; isUploadImage = false"
                   class="flex items-center px-1.5 py-[2px] absolute -right-[6px] rounded-md"
                   :class="isDelete ? 'bg-blue-500' : 'hover:bg-gray-200'"
                   >
                     <Icon 
                      class="cursor-pointer"
                      name="carbon:trash-can"
                      size="20"
                      :color="isDelete ? '#FFFFFF' : '#676B5F'"
                     />
                   </button>
                  </div>
               </div>
           </div>
         </div>

         <div
           id="FooterLinkDeleteSection"
           class="overflow-hidden"
           :class="[
            {'max-h-[180px] transition-all duration-300 ease-in': isDelete},
            {'max-h-0 transition-all duration-200 ease-out': !isDelete}
           ]"
         >
         <button
          @click="isDelete = false"
          class="relative w-full bg-[#DFE2D9] py-1.5"
         >
           <Icon 
            name="mdi:close"
            class="absolute right-1 top-[6px] cursor-pointer"
            size="20"
            color="#45494A"
           />
           <div class="text-center text-sm font-bold text-[#45494A]">
             Cancelar
           </div>
         </button>
         <div class="flex items-center justify-center pt-3">
           Deseja cancelar o agendamento?
         </div>
         <div class="w-full px-4 py-3">
          <div class="flex items-center gap-2 w-full">
            <button
            @click="cancelar()"
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
            "
            >
             Cancelar
            </button>
          </div>
         </div>
         </div>
         <div
         id="FooterLinkBoxSection"
         class="overflow-hidden"
         :class="[
            {'max-h-[180px] transition-all duration-300 ease-in': isUploadImage },
            {'max-h-0 transition-all duration-200 ease-out': !isUploadImage}

         ]"
         
         >
          <div class="relative w-full bg-[#DFE2D9] py-1.5">
             <Icon
             @click="isUploadImage = false"
             name="mdi:close"
             class="absolute right-1 top-[6px] cursor-pointer"
             size="20"
             color="#45494A"
             />
             <div class="text-center text-sm font-bold text-[#45494A]">
               Add Thumbnail
             </div>
          </div>

          <div class="w-full flex items-center justify-between px-4 py-5">
             <img 
              class="rounded-lg w-[80px] aspect-square"
              
             >
             <div class="w-full pl-3">
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
                bg-[#8228D9]
                hover:bg-[#6c21b3]
                mb-2
               "
              >
                Change
              </button>
             </div>
          </div>
         </div>
         
    </div>
</template>

<script setup>
import { useUserStore } from '~~/stores/user';
import { storeToRefs } from 'pinia';
const userStore = useUserStore()
const { isMobile, updatedLinkId } = storeToRefs(userStore)
const props = defineProps({
    link: Object,
   
})

const { link } = toRefs(props)

const emit = defineEmits(['updatedInput'])


let isDelete = ref(false)
let openCropper = ref(false)
let isUploadImage = ref(false)









const cancelar = async () => {
  let res = confirm('Are you sure you want to delete this link?')
    try {
        if (res) {
            await userStore.cancelarAgendamento(link.value.id)
            await userStore.getAllAgendamentos()
        }
    } catch (error) {
        console.log(error)
    }
}






</script>