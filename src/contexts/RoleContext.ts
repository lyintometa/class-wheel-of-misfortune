import { createContext } from 'react'

export interface RoleContextValue {
  numTanks: number
  numHeals: number
}

export const RoleContext = createContext<RoleContextValue>({ numTanks: 0, numHeals: 0 })
