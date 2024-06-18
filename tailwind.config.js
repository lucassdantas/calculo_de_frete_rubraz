/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "yellow-rubraz":"#FCBA08",
        "light-yellow-rubraz":"#FFBC01",
        "blue-rubraz":"#175DBD",
        "blue-body-rubraz":"#0051BA",
      },
    },
    
  },
  plugins: [],
}

