<template>
    <div class="fixed z-50 h-full">
      <div class="fixed inset-0 bg-black bg-opacity-60"></div>
      <div class="fixed inset-0 z-10 overflow-auto h-full">
        <div class="flex flex-col min-h-full justify-center items-center">
          <div
            class="
              transform
              overflow-hidden
              rounded-lg
              bg-white
              shadow-4xl
             
              transition-all
             w-full
             h-full
             
            "
          >
            <div class="flex items-center py-4 border-b border-b-gray-300">
              <div class="text-[22px] font-semibold w-full text-center">
                Pré-visualização de Anexo
              </div>
              <div
                @click="$emit('close')"
                class="absolute right-3  rounded-full p-1.5 bg-gray-200 hover:bg-gray-300 cursor-pointer"
              >
                <Icon name="mdi:close" size="25" />
              </div>
              <button
                
               
                @click="handleDownload(documento)"
                class="absolute right-10 mr-5 rounded-full p-1.5 bg-gray-200 hover:bg-gray-300 cursor-pointer"
              >
                <Icon name="material-symbols:download" size="25" />
            </button>
            
            </div>
  
            <div class="flex items-center bg-white px-4 ">
              <div class="w-full">
                <div class="my-4">
                
                  <div v-if="isPdf(documento)">
                    <!-- Exibindo o PDF em um iframe -->
                    <iframe
                      class="w-full min-h-[100vh]"
                      :src="documento"
                      frameborder="0"
                      scrolling="auto"
                    ></iframe>
                  </div>
                  <div v-else>
                    <img :src="documento" alt="Documento" class="w-full rounded-lg">
                  </div>
                </div>
  
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { defineProps } from 'vue';
  
  const props = defineProps({
    documento: String,
  });

  const handleDownload = async (url) => {
  if (!url) {
    console.error("URL do documento não fornecida.");
    return;
  }

  try {
    const response = await fetch(url);
    const blob = await response.blob();
    const blobURL = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = blobURL;
    a.style.display = "none";



    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  } catch (error) {
    console.error("Erro ao baixar o arquivo:", error);
  }
};
  
  // Verifica se o documento é um PDF
  const isPdf = (url) => {
    return url && url.toLowerCase().endsWith('.pdf');
  };
  </script>
  
