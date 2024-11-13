<template>
    <div id="AuthLayout" class="h-screen w-full flex justify-between bg-[#24305E]  overflow-x-hidden ">
        <div class="lg:pt-7 pt-3 lg:px-12 px-6 lg:w-2/3 w-full lg:min-w-[800px]">
            <NuxtLink 
    to="/" 
    v-if="route.fullPath === '/forgot-password'"
    class="inline-block flex items-center space-x-2 group"
  >
    <div class="flex items-center justify-center w-[40px] h-[40px]  rounded-full transition-all duration-300 group-hover:bg-white group-hover:bg-opacity-20">
      <Icon 
        name="mdi:arrow-left"
        class="mt-[2px] transition-transform duration-300 group-hover:scale-110"
        size="25"
        color="white"
      />
    </div>
  </NuxtLink>
            <main class="w-full">
                <div class="w-full md:max-w-[550px] max-w-[360px] mx-auto">
                    <slot />
                </div>
            </main>
        </div>

        <div class="lg:block hidden w-1/3 pointer-events-none">
            <img 
           
                class="object-cover w-full h-screen select-none" 
                src="~/assets/images/side3.jpg"
            >
           
        </div>
    </div>
</template>

<script setup>


const route = useRoute()

</script>