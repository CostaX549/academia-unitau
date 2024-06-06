import axios from "axios";

export default defineNuxtPlugin((NuxtApp) => {
    axios.defaults.baseURL = 'https://apiacademiaunitau.vercel.app/api'

    axios.defaults.withCredentials = true;
    axios.defaults.withXSRFToken = true;
    return {
        provide: { 
            axios: axios
        },
    }
});