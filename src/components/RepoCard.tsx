import {
  // QuestionIcon,
  ForkIcon,
  RepoIcon,
  StarIcon,
} from './icons'
import { LanguageBadge } from './LanguageBadge'

export interface Language {
  name: string
  color: string
}

export interface RepoCardProps {
  thumbnail?: string
  name?: string
  url?: string
  shortDescriptionHTML?: string
  languages?: Language[]
  stargazerCount?: number
  forkCount?: number
  isArchived?: boolean
}

export function RepoCard(props: RepoCardProps) {
  const {
    // thumbnail,
    name = 'my-project',
    url,
    shortDescriptionHTML = 'A description of the project',
    languages = [{ name: 'TypeScript', color: '#3178c6' }],
    stargazerCount = 0,
    forkCount = 0,
    isArchived = false,
  } = props

  const repoName = url ? (
    <a href={url} className="hover:underline text-primary">
      {name}
    </a>
  ) : (
    <>{name}</>
  )

  const statusBadge = isArchived ? (
    <div className="badge border-warning text-warning overflow-hidden whitespace-nowrap">Public archive</div>
  ) : (
    <div className="badge border-neutral overflow-hidden whitespace-nowrap">Public</div>
  )

  return (
    <div className="flex flex-col h-full relative rounded-xl bg-base-100 shadow-xl border-2 border-neutral">
      <div className="flex flex-col flex-auto p-8 pb-4 gap-2">
        <div className="flex items-center gap-2">
          <RepoIcon />
          <h2 className="card-title">{repoName}</h2>
          {statusBadge}
        </div>
        <p>{shortDescriptionHTML}</p>
      </div>
      {/**
      <figure>
        {!!thumbnail && <img src={thumbnail} height={200} width={200} alt={name} />}
        {!thumbnail && <QuestionIcon />}
      </figure>
      **/}
      <div className="flex p-8 pt-4 gap-4">
        <div
          className="flex grow items-center gap-2 overflow-hidden"
          style={{
            maskImage: 'linear-gradient(90deg, #000 80%, transparent)',
          }}
        >
          {languages
            ?.slice(0, 3)
            ?.map((lang) => (
              <LanguageBadge key={lang?.name} name={lang?.name} color={lang?.color} />
            ))}
        </div>
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
