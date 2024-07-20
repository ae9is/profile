import { RepoCard } from './components/RepoCard'
import { useUserRepositories } from './hooks/useUserRepositories'
import { useEffect, useState } from 'react'

enum RepoSort {
  LAST_UPDATED = 'Last updated',
  NAME = 'Name',
  STARS = 'Stars',
  RESET = 'Sort',
}

export function App() {
  const [sortOrder, setSortOrder] = useState<RepoSort>(RepoSort.STARS)
  const meta = useUserRepositories()
  const userLogin = meta.login
  const userName = meta.name
  const userAvatar = meta.avatarUrl ?? 'user.svg'
  const repos = meta.repositories.nodes?.sort(sortBySortOrder)
  const repoCount = meta.repositories.totalCount

  function sortBySortOrder(a: any, b: any) {
    if (sortOrder == RepoSort.LAST_UPDATED) {
      return new Date(b.updatedAt) > new Date(a.updatedAt) ? 1 : -1
    } else if (sortOrder == RepoSort.NAME) {
      return a.name.localeCompare(b.name)
    } else {
      // RepoSort.STARS
      return b.stargazerCount - a.stargazerCount
    }
  }

  function onChangeSort(event: React.FormEvent<HTMLSelectElement>) {
    const value = event.currentTarget.value
    if (value == RepoSort.LAST_UPDATED) {
      setSortOrder(RepoSort.LAST_UPDATED)
    } else if (value == RepoSort.NAME) {
      setSortOrder(RepoSort.NAME)
    } else if (value == RepoSort.STARS) {
      setSortOrder(RepoSort.STARS)
    } else {
      setSortOrder(RepoSort.RESET)
    }
  }

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
        <div className="flex justify-between px-2">
          <div className="flex gap-4">
            <a href={`https://github.com/${userLogin}?tab=repositories`}>
              <h3 className="text-white">Repositories</h3>
            </a>
            <div className="">{repoCount}</div>
          </div>
          <div className="">
            <label className="w-full max-w-xs">
              <span className="label-text pr-4">Sort order</span>
              <select
                value={sortOrder}
                onChange={onChangeSort}
                className="select select-bordered select-sm"
              >
                <option disabled selected className="font-bold">
                  {RepoSort.RESET}
                </option>
                <option>{RepoSort.LAST_UPDATED}</option>
                <option>{RepoSort.NAME}</option>
                <option>{RepoSort.STARS}</option>
              </select>
            </label>
          </div>
        </div>
        <div className="flex flex-wrap">
          {repos?.map((r) => (
            <div key={r?.name} className="px-2 mt-4 w-full md:w-1/2">
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
