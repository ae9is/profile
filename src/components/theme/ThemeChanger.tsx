import { useEffect, useState } from 'react'
import { themeChange } from 'theme-change'
import { altTheme, defaultTheme } from '../../lib/theme'
import { IconToggle } from '../IconToggle'
import { DarkModeIcon } from '../icons/DarkModeIcon'
import { LightModeIcon } from '../icons/LightModeIcon'

// Two state theme changer, for example to swap between light and dark modes
export function ThemeChanger() {
  const initialTheme =
    typeof window !== 'undefined'
      ? window?.localStorage?.getItem('theme') ?? defaultTheme
      : defaultTheme
  const [theme, setTheme] = useState(initialTheme)
  const checked = theme === defaultTheme

  function handleChange() {
    setTheme((theme) => {
      if (theme === defaultTheme) {
        return altTheme
      } else {
        return defaultTheme
      }
    })
  }

  useEffect(() => {
    themeChange(false)

    return () => {
      // Prevent errors with React strict mode in development
      // ref: https://github.com/saadeghi/theme-change/issues/30
      themeChange(false)
    }
  }, [])

  return (
    <IconToggle
      id="theme-change-toggle"
      data-toggle-theme={`${defaultTheme},${altTheme}`}
      readOnly
      checked={checked}
      onChange={handleChange}
      icon={<DarkModeIcon fill="white" className="w-6 h-6" />}
      uncheckedIcon={<LightModeIcon stroke="black" strokeWidth={1.5} className="w-6 h-6" />}
    />
  )
}
