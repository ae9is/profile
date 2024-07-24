import { ChangeEvent, useEffect, useState } from 'react'
import Dice from 'react-dice-roll'
import { useUserRepositories } from './hooks/useUserRepositories'
import { shuffle } from './lib/array'
import { Gist, PinnedGist, PinnedRepository, Repository } from './queries/userRepositories'
import { CardList } from './components/cards/CardList'
import { SHOW_PINNED } from './config'
import { RepoCard } from './components/cards/RepoCard'
import { GistCard } from './components/cards/GistCard'
import { SearchInput } from './components/SearchInput'

enum RepoSort {
  LAST_UPDATED = 'Last updated',
  NAME = 'Name',
  STARS = 'Stars',
  RANDOM = 'Random',
}

export function App() {
  const meta = useUserRepositories()
  const userLogin = meta.login
  const userName = meta.name
  const userAvatar = meta.avatarUrl ?? 'user.svg'
  const pins = meta?.pinnedItems?.nodes ?? []
  const [searchText, setSearchText] = useState<string>('')
  const pinnedCards = pins.filter(pinMatchesSearch).map(cardFromPin)
  const pinCount = pinnedCards?.length ?? meta?.pinnedItems?.totalCount ?? 0
  const repos = meta?.repositories?.nodes ?? []
  const [sortOrder, setSortOrder] = useState<RepoSort>(RepoSort.STARS)
  const [sortedRepos, setSortedRepos] = useState<Repository[]>(
    repos.sort((a, b) => sortBySortOrder(a, b, sortOrder))
  )
  const displayRepos = sortedRepos.filter((repo) => repoMatchesSearch(repo, searchText))
  const repoCount = displayRepos?.length ?? meta?.repositories?.totalCount ?? 0
  const repoCards = displayRepos.map(cardFromRepo)

  function pinMatchesSearch(pin: PinnedGist | PinnedRepository) {
    if (!searchText) {
      return true
    }
    const search = searchText.toLowerCase()
    const isGist = pin.__typename === 'Gist'
    if (isGist) {
      const gist = pin as PinnedGist
      return gist?.description?.toLowerCase().includes(search)
    } else {
      const repo = pin as PinnedRepository
      const repoMatch = repo?.name?.toLowerCase()?.includes(search)
      const langMatch = repo?.languages?.nodes?.some((l) => l?.name?.toLowerCase().includes(search))
      const descMatch = repo?.shortDescriptionHTML?.toLowerCase().includes(search)
      const topicMatch = repo?.repositoryTopics?.nodes?.some((n) =>
        n?.topic?.name?.toLowerCase().includes(search)
      )
      return repoMatch || langMatch || descMatch || topicMatch
    }
  }

  function repoMatchesSearch(repo: Repository, searchText: string) {
    if (!searchText) {
      return true
    }
    const search = searchText.toLowerCase()
    const repoMatch = repo?.name?.toLowerCase().includes(search)
    const langMatch = repo?.languages?.nodes?.some((l) => l?.name?.toLowerCase().includes(search))
    const descMatch = repo?.shortDescriptionHTML?.toLowerCase().includes(search)
    const topicMatch = repo?.repositoryTopics?.nodes?.some((n) =>
      n?.topic?.name?.toLowerCase().includes(search)
    )
    return repoMatch || langMatch || descMatch || topicMatch
  }

  function isGist(pin: PinnedGist | PinnedRepository): pin is PinnedGist {
    return pin.__typename === 'Gist'
  }

  function cardFromPin(pin: PinnedGist | PinnedRepository, idx: number) {
    if (isGist(pin)) {
      return cardFromGist(pin, idx)
    }
    return cardFromRepo(pin, idx)
  }

  function cardFromRepo(r: Repository, idx: number) {
    return (
      <RepoCard
        key={r?.name ?? idx}
        name={r?.name ?? '???'}
        url={r?.url}
        shortDescriptionHTML={r?.shortDescriptionHTML ?? ' '}
        languages={r?.languages?.nodes ?? []}
        repositoryTopics={r?.repositoryTopics?.nodes ?? []}
        stargazerCount={r?.stargazerCount}
        forkCount={r?.forkCount}
        isArchived={r?.isArchived}
        //thumbnail={'public/thumbs/' + r?.name + '.png'}
      />
    )
  }

  function cardFromGist(g: Gist, idx: number) {
    return (
      <GistCard
        key={g?.name ?? idx}
        name={g?.name ?? '???'}
        url={g?.url}
        description={g?.description ?? '???'}
        stargazerCount={g?.stargazerCount}
        forkCount={g?.forks?.totalCount}
      />
    )
  }

  function sortBySortOrder(a: Repository, b: Repository, sortOrder: RepoSort) {
    if (sortOrder == RepoSort.LAST_UPDATED) {
      return new Date(b?.updatedAt ?? 0) > new Date(a?.updatedAt ?? 0) ? 1 : -1
    } else if (sortOrder == RepoSort.NAME) {
      return a.name.localeCompare(b.name)
    } else {
      // RepoSort.STARS
      return (b?.stargazerCount ?? 0) - (a?.stargazerCount ?? 0)
    }
  }

  function onChangeSort(event: React.FormEvent<HTMLSelectElement>) {
    const value = event.currentTarget.value
    let newSortOrder: RepoSort = sortOrder
    if (value == RepoSort.LAST_UPDATED) {
      newSortOrder = RepoSort.LAST_UPDATED
    } else if (value == RepoSort.NAME) {
      newSortOrder = RepoSort.NAME
    } else if (value == RepoSort.STARS) {
      newSortOrder = RepoSort.STARS
    } else {
      console.error('No such sort order: ', value)
    }
    setSortOrder(newSortOrder)
    setSortedRepos((repos) => repos.sort((a, b) => sortBySortOrder(a, b, newSortOrder)))
  }

  function onDiceRoll() {
    setSortOrder(RepoSort.RANDOM)
    setSortedRepos((repos) => shuffle(repos))
  }

  function onChangeSearch(event: ChangeEvent<HTMLInputElement>) {
    const newSearch = event?.currentTarget?.value
    setSearchText(newSearch)
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
      <div className="w-full">
        <div className="md:px-2 mb-8">
          <SearchInput value={searchText} onChange={onChangeSearch} />
        </div>
        {SHOW_PINNED && (
          <>
            <div className="md:px-2">
              <div className="flex gap-4 pr-4">
                <h3 className="text-white">Pinned</h3>
                <div className="">{pinCount}</div>
              </div>
            </div>
            <div className="mb-8">
              <CardList cards={pinnedCards} />
            </div>
          </>
        )}
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
                <option hidden disabled>
                  {RepoSort.RANDOM}
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
        <div className="mb-4">
          <CardList cards={repoCards} />
        </div>
      </div>
    </div>
  )
}
