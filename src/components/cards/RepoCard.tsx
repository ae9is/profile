import { Language, RepositoryTopic } from '../../queries/userRepositories'
import { BadgeList } from '../badges/BadgeList'
import {
  // QuestionIcon,
  ForkIcon,
  RepoIcon,
  StarIcon,
} from '../icons'
import { LanguageBadge } from '../badges/LanguageBadge'
import { TopicBadge } from '../badges/TopicBadge'

export interface RepoCardProps {
  thumbnail?: string
  name?: string
  url?: string
  shortDescriptionHTML?: string
  languages?: Language[]
  stargazerCount?: number
  forkCount?: number
  isArchived?: boolean
  repositoryTopics?: RepositoryTopic[]
}

export function RepoCard(props: RepoCardProps) {
  const {
    // thumbnail,
    name = 'my-project',
    url,
    shortDescriptionHTML = 'A description of the project',
    languages = [{ name: 'TypeScript', color: '#3178c6' }],
    repositoryTopics = [
      { topic: { name: 'react' }, url: 'https://github.com/topics/react' },
      { topic: { name: 'vite' }, url: 'https://github.com/topics/vite' },
    ],
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
    <div className="badge border-warning text-warning overflow-hidden whitespace-nowrap">
      Public archive
    </div>
  ) : (
    <div className="badge border-neutral overflow-hidden whitespace-nowrap">Public</div>
  )

  const languageBadges = languages
    ?.slice(0, 3)
    ?.map((lang) => <LanguageBadge key={lang?.name} name={lang?.name} color={lang?.color} />)

  const topicBadges = repositoryTopics
    ?.slice(0, 5)
    ?.map((topic) => <TopicBadge key={topic.topic.name} name={topic.topic.name} url={topic.url} />)

  return (
    <div className="flex flex-col h-full relative rounded-xl bg-base-100 max-w-md shadow-xl border-2 border-neutral">
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
      {topicBadges?.length > 0 && (
        <div className="flex flex-auto p-8 py-4">
          <BadgeList badges={topicBadges} />
        </div>
      )}
      <div className="flex p-8 pt-4 gap-4">
        <BadgeList badges={languageBadges} />
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