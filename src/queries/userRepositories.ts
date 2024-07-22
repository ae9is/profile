export interface UserRepositories {
  user: User
}

export interface User {
  login: string
  name?: string
  bio?: string
  avatarUrl?: string
  pinnedItems?: PinnedItemConnection
  repositories?: RepositoryConnection
}

export interface Node {
  name: string
  createdAt?: string
  isFork?: boolean
  stargazerCount?: number
  pushedAt?: string
  updatedAt?: string
  url?: string
}

export interface Gist extends Node {
  resourcePath?: string
  url?: string
  isPublic?: boolean
  isFork?: boolean
  description?: string
  createdAt?: string
  pushedAt?: string
  updatedAt?: string
}

export interface Repository extends Node {
  forkCount?: number
  isArchived?: boolean
  isPrivate?: boolean
  shortDescriptionHTML?: string
  licenseInfo?: LicenseInfo | null
  languages?: LanguageConnection
  repositoryTopics?: RepositoryTopicConnection
  color?: string
}

export interface RepositoryConnection {
  totalCount: number
  nodes: Repository[]
}

export interface PinnedItemConnection {
  totalCount: number
  nodes: Gist[] | Repository[]
}

export interface LanguageConnection {
  totalCount: number
  nodes: Language[]
}

export interface Language {
  name: string
  color: string
}

export interface LicenseInfo {
  spdxId: string
}

export interface RepositoryTopicConnection {
  totalCount: number
  nodes: RepositoryTopic[]
}

export interface RepositoryTopic {
  topic: Topic
  url: string
}

export interface Topic {
  name: string
}
