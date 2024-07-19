import { RepoCard } from './components/RepoCard'
import { useUserRepositories } from './hooks/useUserRepositories'
import { useEffect } from 'react'

export function App() {
  const meta = useUserRepositories()
  const userLogin = meta.login
  const userName = meta.name
  const userAvatar = meta.avatarUrl ?? 'user.svg'
  const repos = meta.repositories.nodes?.sort((a, b) => b.stargazerCount - a.stargazerCount)
  const repoCount = meta.repositories.totalCount

  useEffect(() => {
    const titleUserName = userName ? `(${userName}) ` : ''
    const titleText = `${userLogin} ${titleUserName}• GitHub`
    document.title = titleText
  }, [userLogin, userName])

  return (
    <div className="container mx-auto p-4 md:p-8 max-w-screen-xl flex gap-4">
      <div className="w-64">
        <div className="avatar">
          <div className="w-64 avatar rounded-full ring ring-neutral bg-neutral">
            <img src={userAvatar} alt={'Avatar'} />
          </div>
        </div>
        <h1 className="font-medium text-3xl text-white">{userName}</h1>
        <h2>
          <a href={`https://github.com/${userLogin}`}>{userLogin}</a>
        </h2>
        <div className="mt-4">
          <a href={`https://github.com/${userLogin}/profile/`}>
            <button className="btn btn-neutral border border-neutral">Profile source</button>
          </a>
        </div>
      </div>
      <div>
        <div className="flex gap-4">
          <a href={`https://github.com/${userLogin}?tab=repositories`}>
            <h3 className="text-white">Repositories</h3>
          </a>
          <div className="">{repoCount}</div>
        </div>
        <div className="flex flex-wrap">
          {repos?.map((r) => (
            <div key={r.name} className="px-2 mt-4 w-full md:w-1/2">
              <RepoCard
                name={r?.name ?? '???'}
                url={r?.url}
                shortDescriptionHTML={r?.shortDescriptionHTML ?? ' '}
                languages={r?.languages?.nodes}
                stargazerCount={r?.stargazerCount}
                forkCount={r?.forkCount}
                isArchived={r?.isArchived}
                //thumbnail={'public/thumbs/' + r?.name + '.png'}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
