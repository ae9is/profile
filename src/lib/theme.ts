// These themes should be in tailwind.config.js under daisyui themes
export const defaultTheme = 'dark'
export const altTheme = 'light'
export const initialTheme =
  typeof window !== 'undefined'
    ? window?.localStorage?.getItem('theme') || defaultTheme
    : defaultTheme
