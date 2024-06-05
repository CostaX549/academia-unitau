/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");
export default {
  
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
    "./node_modules/vue-tailwind-datepicker/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        "vtd-primary": colors.sky, // Light mode Datepicker color
      
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
}

