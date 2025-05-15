/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Fichiers sources React
    "./index.html",               // Fichier HTML principal si nécessaire
    "./node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@material-tailwind/react/theme/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-light': '#FBF6E9',
        'custom-header': '#118b50',
        'custom-search': '#f3f3e5',
        'custom-dark-green': '#118B50',
      },
    },
  },
  plugins: [],
};
