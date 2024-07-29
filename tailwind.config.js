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
          'base-100': "#ffffff",
          'base-200': '#f6f8fa',
          primary: '#3377ee',
          neutral: '#e6e6e6',
          'neutral-content': '#636c76',
          warning: '#bb8b00',
        },
        dark: {
          ...require('daisyui/src/theming/themes')['dark'],
          primary: '#4daafc',
          'base-100': '#1f1f1f', // '#181b1b',
          'neutral': '#404040', // '#52677a',
          'neutral-content': '#cccccc', // '#c2cdd6',
          'base-content': '#cccccc', // '#c2cdd6',
        },
      }
    ],
    darkTheme: 'dark',
  },
  darkMode: ['class', '[data-theme="dark"]'],
}
