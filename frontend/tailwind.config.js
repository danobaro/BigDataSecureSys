/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", 
    './node_modules/tw-elements/dist/js/**/*.js',
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
  ],
  plugins: [
    require('tw-elements/dist/plugin'),
    require('flowbite/plugin')
  ],
  theme: {
    extend: {
      colors:{
        "dark-purple": "#581c87",
        "dark-blue": "#1d4ed8",
        "emerald":"#047857",
        "dark-purple-900": "#581c87",
        "green":"#15803d",
        "light-white": "rgba(255,255,255,0.18)",
        primary: {
          "50":"#eff6ff",
          "100":"#dbeafe",
          "200":"#bfdbfe",
          "300":"#93c5fd",
          "400":"#60a5fa",
          "500":"#3b82f6",
          "600":"#2563eb",
          "700":"#1d4ed8",
          "800":"#1e40af",
          "900":"#1e3a8a",
          "950":"#172554"
        }

      }
    },
    fontFamily: {
        'body': [
      'Inter', 
      'ui-sans-serif', 
      'system-ui', 
      '-apple-system', 
      'system-ui', 
      'Segoe UI', 
      'Roboto', 
      'Helvetica Neue', 
      'Arial', 
      'Noto Sans', 
      'sans-serif', 
      'Apple Color Emoji', 
      'Segoe UI Emoji', 
      'Segoe UI Symbol', 
      'Noto Color Emoji'
    ],
        'sans': [
      'Inter', 
      'ui-sans-serif', 
      'system-ui', 
      '-apple-system', 
      'system-ui', 
      'Segoe UI', 
      'Roboto', 
      'Helvetica Neue', 
      'Arial', 
      'Noto Sans', 
      'sans-serif', 
      'Apple Color Emoji', 
      'Segoe UI Emoji', 
      'Segoe UI Symbol', 
      'Noto Color Emoji'
    ]
      },
      container: {
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
          '2xl': '6rem',
          
        },
      center: true,
    },
  },
  plugins: [require('daisyui')],
}
