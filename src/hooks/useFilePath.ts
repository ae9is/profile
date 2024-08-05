// Find any files matching a path plus extensions.
// I.e. '/path/to/example', ['webp', 'png'] -> '/path/to/example.webp'

import { useEffect, useState } from 'react'

export const imageExtensions = [
  //
  'webp',
  'png',
  'jpg',
  'svg',
]

export function useFilePath(basePath: string, possibleExtensions = imageExtensions) {
  const [path, setPath] = useState<string | undefined>()

  useEffect(() => {
    const findPath = async (basePath: string, possibleExtensions: string[]) => {
      const promises = possibleExtensions.map((ext) =>
        (async () => {
          try {
            const searchPath = `${basePath}.${ext}`
            const resp = await fetch(searchPath)
            if (resp?.ok) {
              // Vite will return 200 even on not found requests, need to sanity check content itself
              const blob = await resp.blob()
              if (blob?.size > 0 && blob?.type?.includes('image')) {
                return searchPath
              }
            }
          } catch (err) {
            //
          }
          throw new Error('reject')
        })().catch()
      )
      try {
        const found = await Promise.any(promises)
        setPath(found)
      } catch (aggregateErr) {
        // console.warn(`No thumbnail found for ${basePath}`)
      }
    }

    findPath(basePath, possibleExtensions)
  }, [basePath, possibleExtensions])

  return path
}
