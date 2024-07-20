// Utility functions for arrays

/**
 * Assigns a random number to every element in an array,
 *  re-sorts by the random number, and then returns the 
 *  newly shuffled array without the random number.
 * 
 * ref: https://stackoverflow.com/a/46545530
 * 
 * @param array An array of any elements to shuffle
 * @returns A shuffled array
 */
export function shuffle(array: unknown[]) {
  const shuffled = array
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)
  return shuffled
}
