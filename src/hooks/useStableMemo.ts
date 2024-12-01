import { useMemo, useRef } from 'react'
import { compareObjects } from '../util/compareUtils'

export default function useStableMemo<T>(factory: () => T, equalityFn = compareObjects) {
  const lastResult = useRef<T>(factory())

  return useMemo<T>(() => {
    const result = factory()
    if (equalityFn(lastResult.current, result)) return lastResult.current
    lastResult.current = result
    return result
  }, [factory, equalityFn])
}
