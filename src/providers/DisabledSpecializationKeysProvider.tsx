import { ReactNode } from 'react'

import useLocalStorage from '../hooks/useLocalStorage'
import { SetDisabledSpecializationsContext } from '../contexts/SetDisabledSpecializationsContext'
import { DisabledSpecializationsContext } from '../contexts/DisabledSpecializationsContext'

interface DisabledSpecializationsProviderProps {
  children?: ReactNode
}

export default function DisabledSpecializationsProvider({ children }: DisabledSpecializationsProviderProps) {
  const [keys, setKeys] = useLocalStorage<string[]>('GLOBAL_DISABLED_SPECS', [])

  return (
    <SetDisabledSpecializationsContext.Provider value={setKeys}>
      <DisabledSpecializationsContext.Provider value={keys}>{children}</DisabledSpecializationsContext.Provider>
    </SetDisabledSpecializationsContext.Provider>
  )
}
