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
      {
        light: {
          ...require('daisyui/src/theming/themes')['light'],
          primary: '#3377ee',
        },
        dark: {
          ...require('daisyui/src/theming/themes')['dark'],
          primary: '#4daafc',
        },
      }
    ],
    darkTheme: 'dark',
  },
  darkMode: ['class', '[data-theme="dark"]'],
}
