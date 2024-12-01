import { createContext } from 'react'

export const SetDisabledSpecializationsContext = createContext<(keys: string[]) => void>(() => {})
