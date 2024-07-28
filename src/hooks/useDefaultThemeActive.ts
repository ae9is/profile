import { useEffect, useState } from "react";
import { defaultTheme, initialTheme } from "../lib/theme";

export function useDefaultThemeActive() {
  const [isActive, setIsActive] = useState(initialTheme === defaultTheme)

  function handleChange() {
    const dataTheme = document.documentElement.getAttribute('data-theme')
    setIsActive(dataTheme === defaultTheme)
  }
 
  useEffect(() => {
    // Handle change once to start and then only if attributes are modified
    handleChange()
    const observer = new MutationObserver((mutations) => {
      mutations?.forEach((mut) => {
        if (mut?.type === 'attributes') {
          handleChange()
        }
      })
    })
    observer.observe(document.documentElement, {
      attributes: true,
    })

    return () => {
      observer.disconnect()
    }
  }, [])

  return isActive
}

