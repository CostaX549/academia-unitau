import axios from "axios";

export default defineNuxtPlugin((NuxtApp) => {
    axios.defaults.baseURL = 'http://192.168.0.72'

    axios.defaults.withCredentials = true;
    axios.defaults.withXSRFToken = true;
    return {
        provide: { 
            axios: axios
        },
    }
});