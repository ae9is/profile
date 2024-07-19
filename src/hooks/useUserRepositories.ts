import resp from '../data/userRepositories.json'

/**
 * Retrieves repository metadata.
 * Ideally this would be a live query, for now just import pre-fetched json.
 * @param username GitHub login handle
 * @returns GitHub user metadata including repository info
 */
export function useUserRepositories() {
  //username: string
  return resp.data.user
}
