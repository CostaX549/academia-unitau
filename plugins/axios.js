import axios from "axios";

export default defineNuxtPlugin((NuxtApp) => {
    axios.defaults.baseURL = 'https://academiaunitauapi.vercel.app/api'

    axios.defaults.withCredentials = true;
    axios.defaults.withXSRFToken = true;
    return {
        provide: { 
            axios: axios
        },
    }
});