/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'black': '#000000',
        'grey': '#272829',
        'orange': '#D65A31',
        'white': '#F2F2F2',
        'blue': '#1A8B9D',
      }
    },
  },
  plugins: [],
}

