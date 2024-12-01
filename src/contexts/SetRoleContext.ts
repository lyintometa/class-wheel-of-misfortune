import { createContext } from 'react'
import { RoleContextValue } from './RoleContext'

export const SetRoleContext = createContext<(value: RoleContextValue) => void>(() => {})
