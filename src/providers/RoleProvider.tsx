import { ReactNode } from 'react'

import { RoleContext, RoleContextValue } from '../contexts/RoleContext'
import { SetRoleContext } from '../contexts/SetRoleContext'
import useLocalStorage from '../hooks/useLocalStorage'

interface RoleProviderProps {
  children?: ReactNode
}

export default function RoleProvider({ children }: RoleProviderProps) {
  const [roles, setRoles] = useLocalStorage<RoleContextValue>('GLOBAL_ROLES', { numTanks: 0, numHeals: 0 })

  return (
    <SetRoleContext.Provider value={setRoles}>
      <RoleContext.Provider value={roles}>{children}</RoleContext.Provider>
    </SetRoleContext.Provider>
  )
}
