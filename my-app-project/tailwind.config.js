/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#059669', // emerald-600
        secondary: '#d97706', // amber-600
      },
    },
  },
  plugins: [],
}
