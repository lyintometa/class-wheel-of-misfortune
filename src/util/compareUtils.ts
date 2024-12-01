export const compareObjects = <T>(obj: T, other: T): boolean => {
  if (obj === other) return true

  if (typeof obj !== typeof other) return false
  if (typeof obj !== 'object') return false

  if (obj === null) return other === null
  if (other === null) return false
  if (Array.isArray(obj)) return Array.isArray(other) && compareArrays(obj, other)
  if (Array.isArray(other)) return false

  if (!compareArrays(Object.keys(obj).sort(), Object.keys(other!).sort())) return false

  return Object.entries(obj).every(([key, value]) => compareObjects(value, (other as Record<string, unknown>)[key]))
}

export const compareArrays = <T>(arr: T[], other: T[]): boolean => {
  if (arr.length !== other.length) return false
  return arr.every((item, i) => compareObjects(item, other[i]))
}
