import { Dispatch, SetStateAction, useCallback, useState } from 'react'

type UseLocalStorageResult<T> = [T, Dispatch<SetStateAction<T>>]

export default function useLocalStorage<T>(key: string, defaultValue: T): UseLocalStorageResult<T>
export default function useLocalStorage<T>(key: string): UseLocalStorageResult<T | undefined>
export default function useLocalStorage<T>(key: string, defaultValue?: T): UseLocalStorageResult<T | undefined> {
  const [value, setValue] = useState<T | undefined>(() => getDefaultValue(key, defaultValue))

  const setValueInteral = useCallback(
    (dispatch: SetStateAction<T | undefined>) => {
      if (dispatch === undefined) {
        localStorage.removeItem(key)
        setValue(undefined)
        return
      }

      if (isSetStateAction(dispatch)) {
        setValue(prev => {
          const newValue = dispatch(prev)
          localStorage.setItem(key, JSON.stringify(newValue))
          return newValue
        })

        return
      }

      localStorage.setItem(key, JSON.stringify(dispatch))
      setValue(dispatch)
    },
    [key]
  )

  return [value, setValueInteral]
}

const getDefaultValue = <T>(key: string, defaultValue?: T) => {
  const item = localStorage.getItem(key)
  if (item !== null) return item !== undefined ? JSON.parse(item) : undefined
  if (defaultValue === undefined) return undefined
  localStorage.setItem(key, JSON.stringify(defaultValue))
  return defaultValue
}

const isSetStateAction = <T>(action: SetStateAction<T>): action is (prevState: T) => T => typeof action === 'function'
