/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    //
    './index.html',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        lg: '960px',
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
    require('@tailwindcss/typography'),
    require('daisyui'),
  ],
  daisyui: {
    themes: [
      'light',
      'dark',
      {
        myprofile: {
          primary: '#4493f8',
        },
      },
    ],
  },
  theme: {
    extend: {
      colors: {
      },
    },
  },
}
