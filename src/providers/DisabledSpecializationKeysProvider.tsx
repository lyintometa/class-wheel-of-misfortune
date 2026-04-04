import { ReactNode } from 'react'

import { DisabledSpecializationsContext } from '../contexts/DisabledSpecializationsContext'
import { SetDisabledSpecializationsContext } from '../contexts/SetDisabledSpecializationsContext'
import useLocalStorage from '../hooks/useLocalStorage'

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
