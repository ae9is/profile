import { ForkIcon, GistIcon, StarIcon } from '../icons'

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

  return (
    <div className="flex flex-col h-full relative rounded-xl bg-base-100 max-w-md shadow-xl border-2 border-neutral">
      <div className="flex flex-col flex-auto p-8 pb-4 gap-2">
        <div className="flex items-center gap-2">
          <GistIcon />
          <h2 className="card-title">{gistName}</h2>
        </div>
        {/** <p>Short content of gist {name} goes here ...</p> **/}
      </div>
      <div className="flex p-8 pt-4 gap-4">
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