import { useEffect, useState } from 'react'
import Dice from 'react-dice-roll'
import { RepoCard } from './components/RepoCard'
import { useUserRepositories } from './hooks/useUserRepositories'
import { shuffle } from './lib/array'

enum RepoSort {
  LAST_UPDATED = 'Last updated',
  NAME = 'Name',
  STARS = 'Stars',
  RESET = 'Sort',
}

export function App() {
  const meta = useUserRepositories()
  const userLogin = meta.login
  const userName = meta.name
  const userAvatar = meta.avatarUrl ?? 'user.svg'
  const repos = meta.repositories.nodes
  const repoCount = meta.repositories.totalCount
  const [sortOrder, setSortOrder] = useState<RepoSort>(RepoSort.STARS)
  const [displayRepos, setDisplayRepos] = useState<any[]>(repos.sort(sortBySortOrder))

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
    setDisplayRepos(repos.sort(sortBySortOrder))
  }

  function onDiceRoll() {
    setSortOrder(RepoSort.RESET)
    setDisplayRepos(shuffle(displayRepos))
  }

  useEffect(() => {
    const titleUserName = userName ? `(${userName}) ` : ''
    const titleText = `${userLogin} ${titleUserName}• GitHub`
    document.title = titleText
  }, [userLogin, userName])

  return (
    <div className="container mx-auto p-4 md:p-8 max-w-screen-xl md:flex gap-4">
      <div className="w-full flex md:block md:w-64 mb-4 gap-4">
        <div className="avatar">
          <div className="w-24 md:w-48 lg:w-64 avatar rounded-full ring ring-neutral bg-neutral">
            <img src={userAvatar} alt={'Avatar'} />
          </div>
        </div>
        <div className="w-full flex md:block md:mt-2 lg:mt-4 justify-between items-center">
          <div className="block">
            <h1 className="font-bold text-3xl text-white">{userName}</h1>
            <h2 className="font-medium text-xl">
              <a href={`https://github.com/${userLogin}`}>{userLogin}</a>
            </h2>
          </div>
          <div className="mt-4">
            <a href={`https://github.com/${userLogin}/profile/`}>
              <button className="btn btn-neutral border border-neutral">Profile source</button>
            </a>
          </div>
        </div>
      </div>
      <div>
        <div className="flex justify-between md:px-2 items-center">
          <div className="flex gap-4 pr-4">
            <a href={`https://github.com/${userLogin}?tab=repositories`}>
              <h3 className="text-white">Repositories</h3>
            </a>
            <div className="">{repoCount}</div>
          </div>
          <div className="flex gap-8">
            <label className="flex items-center">
              <div className="text-sm mr-4">Sort order</div>
              <select
                value={sortOrder}
                onChange={onChangeSort}
                className="select select-bordered select-sm"
              >
                <option disabled className="font-bold">
                  {RepoSort.RESET}
                </option>
                <option>{RepoSort.LAST_UPDATED}</option>
                <option>{RepoSort.NAME}</option>
                <option>{RepoSort.STARS}</option>
              </select>
            </label>
            <label className="flex items-center mr-1">
              <span className="text-sm mr-4">Random!</span>
              <Dice cheatValue={5} size={32} rollingTime={350} onRoll={onDiceRoll} />
            </label>
          </div>
        </div>
        <div className="flex flex-wrap">
          {displayRepos?.map((r) => (
            <div key={r?.name} className="md:px-2 mt-4 w-full md:w-1/2">
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
