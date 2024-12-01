import { getRandomInteger } from './numberUtil'

export const getShuffled = <T>(arr: T[]): T[] => {
  const shuffled = [...arr]

  for (let i = shuffled.length - 1; i >= 0; i--) {
    const j = getRandomInteger(i)
    const t = shuffled[i]
    shuffled[i] = shuffled[j]
    shuffled[j] = t
  }

  return shuffled
}

export const intersect = <T>(arr: T[], other: T[]) => arr.filter(item => other.includes(item))
export const distinct = <T>(arr: T[]) => Array.from(new Set(arr))
