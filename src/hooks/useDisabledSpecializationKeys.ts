import { useContext } from 'react'
import { DisabledSpecializationsContext } from '../contexts/DisabledSpecializationsContext'

export const useDisabledSpecializationKeys = (): string[] => useContext(DisabledSpecializationsContext)
