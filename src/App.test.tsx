import { cleanup, render, screen, within } from '@testing-library/react/pure'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { App } from './App'
import data from './data/userRepositories.json'

describe('App', () => {
  beforeAll(() => {
    render(<App />)
  })

  afterAll(() => {
    cleanup()
  })

  it('renders the profile name and login', () => {
    expect(screen.getByRole('heading', { level: 1, name: data.user.name })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: data.user.login })).toHaveAttribute(
      'href',
      `https://github.com/${data.user.login}`
    )
  })

  it('renders the search bar', () => {
    expect(screen.getByTestId('search-input')).toBeInTheDocument()
  })

  it('renders a repository card', () => {
    expect(screen.getByTestId('repositories-heading')).toBeInTheDocument()
    expect(
      within(screen.getByTestId('repository-list')).getAllByTestId('repository-card').length
    ).toBeGreaterThan(0)
  })

  it('renders the sort order control', () => {
    const sortOrder = screen.getByTestId('sort-order-control')
    expect(sortOrder).toHaveDisplayValue('Stars')
    expect(screen.getByRole('option', { name: 'Last updated' })).toBeInTheDocument()
    expect(screen.getByRole('option', { name: 'Name' })).toBeInTheDocument()
    expect(screen.getByRole('option', { name: 'Stars' })).toBeInTheDocument()
  })

  it('renders the dice roller', () => {
    expect(screen.getByTestId('dice-roller')).toBeInTheDocument()
  })
})
