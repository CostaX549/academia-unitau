<template>
    <div 
      
        class="md:block fixed hidden right-0 lg:w-[500px] w-[310px] h-[calc(100%-20px)] mt-[20px] mx-auto border-l border-l-gray-300 pt-20"
    >
        <div
            class="
                mx-auto
                mt-16
                mb-16
                flex 
                items-center 
                justify-center 
                w-full 
                lg:max-w-[230px] 
                max-w-[200px] 
                lg:h-[460px] 
                h-[400px] 
                p-3 
                rounded-3xl
                relative
            "
        >
            <img 
                class="absolute z-10 pointer-events-none select-none" 
                src="~/assets/images/mobile-case.png"
            >

            <div 
                class=" w-full h-full absolute lg:max-w-[220px] max-w-[195px] rounded-3xl z-0" 
               
            />

            <div class="h-full mx-auto w-full overflow-auto z-10">
                <img 
                    class="rounded-full min-w-[60px] w-[60px] mx-auto mt-8"
                    src="~/assets/images/unitau (1).png"
                >

                <div 
                    class="text-center text-sm font-semibold mt-4 break-words"
                   
                >
                   @rafael
                </div>

                <div 
                    class="text-center text-[8px] font-semibold mt-2"
                  
                >
                    <div class="px-8 break-words">
                        {{ userStore.bio }}
                    </div>
                </div>

                <div v-for="link in fakeLink">
                    <a 
                        :href="link.url"
                        target="_blank"
                        class="
                            flex 
                            items-center 
                            relative 
                            w-[calc(100%-10px)] 
                            mx-auto 
                            border
                            bg-white 
                            mt-2 
                            p-1 
                            rounded-xl
                        "
                    >
                        <img 
                            class="rounded-lg h-[30px] aspect-square"
                            :src="link.image"
                        >

                        <div class="absolute w-full">
                            <div class="max-w-[70%] w-full mx-auto text-[10px] text-center">
                                {{ link.datetime }}
                            </div>
                        </div>
                    </a>
                </div>

                <div class="pb-12"/>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useUserStore } from '~~/stores/user'
const userStore = useUserStore()
const fakeLink = [{
    id: 1,
    name: 'Youtube Channel',
    url: "https://www.youtube.com/@johnweeksdev",
    image: "https://picsum.photos/id/8/300/320",
    datetime: "30/05/2024",
    horario: "15:00",
    academia: {
        name: "Academia da Unitau",
        localizacao: "Rua Salvador Pires de Medeiros"
    }
}]
   
</script>