import { useDefaultThemeActive } from '../../hooks/useDefaultThemeActive'
import { ForkIcon, GistIcon, StarIcon } from '../icons'
import { FileIcon } from '../icons/FileIcon'

export interface GistCardProps {
  name?: string
  url?: string
  description?: string
  stargazerCount?: number
  forkCount?: number
}

export function GistCard(props: GistCardProps) {
  const {
    //name = 'abcd12346b31b630ca590d458ed85274',
    url,
    description = 'An example script',
    stargazerCount = 0,
    forkCount = 0,
  } = props

  const gistName = url ? (
    <a href={url} className="hover:underline text-primary">
      {description}
    </a>
  ) : (
    <>{description}</>
  )

  const darkMode = useDefaultThemeActive()
  const iconFill = darkMode ? 'white' : 'black'

  return (
    <div className="flex flex-col h-full w-full relative rounded-xl bg-base-100 shadow-xl border-2 dark:border-1 border-neutral text-neutral-content">
      <div className="flex flex-col p-8 pb-4 gap-2">
        <div className="flex items-center gap-2">
          <div className="flex-none">
            <GistIcon />
          </div>
          <h2 className="card-title">{gistName}</h2>
        </div>
        {/** <p>Short content of gist {name} goes here ...</p> **/}
      </div>
      <a href={url} className="h-32 md:h-full w-full">
        <div className="h-full w-full flex flex-auto justify-center items-center">
          <FileIcon className="w-1/2 h-1/2" viewBox="0 0 384 512" fill={iconFill} />
        </div>
      </a>
      <div className="flex justify-end p-8 pt-4 gap-4">
        <a href={`${url}/stargazers`} className="hover:text-primary">
          <div className="flex items-center gap-1">
            <StarIcon />
            {stargazerCount}
          </div>
        </a>
        <a href={`${url}/forks`} className="hover:text-primary">
          <div className="flex items-center gap-1">
            <ForkIcon />
            {forkCount}
          </div>
        </a>
      </div>
    </div>
  )
}
