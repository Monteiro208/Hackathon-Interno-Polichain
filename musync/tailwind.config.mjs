/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",       // páginas Next (app router)
    "./components/**/*.{js,ts,jsx,tsx}" // seus componentes React
  ],
  theme: { extend: {} },
  plugins: [],
};
