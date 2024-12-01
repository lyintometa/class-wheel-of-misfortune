import RoleName from '../models/Role'
import Specialization from '../models/Specialization'
import { getKey } from '../util/utils'
import { ALL_CLASSES } from './classes'

export const ALL_SPECIALIZATIONS = ALL_CLASSES.flatMap<Specialization>(playableClass => playableClass.specializations)
export const ALL_SPECIALIZATION_KEYS = ALL_SPECIALIZATIONS.map<string>(getKey)

export const ALL_TANK_SPECIALIZATIONS = ALL_SPECIALIZATIONS.filter(spec => spec.role === RoleName.Tank)
export const ALL_HEAL_SPECIALIZATIONS = ALL_SPECIALIZATIONS.filter(spec => spec.role === RoleName.Healer)
export const ALL_DAMAGE_SPECIALIZATIONS = ALL_SPECIALIZATIONS.filter(spec => spec.role === RoleName.DamageDealer)

export const SPECIALIZATIONS_BY_ROLE: Record<RoleName, Specialization[]> = {
  [RoleName.Tank]: ALL_TANK_SPECIALIZATIONS,
  [RoleName.Healer]: ALL_HEAL_SPECIALIZATIONS,
  [RoleName.DamageDealer]: ALL_DAMAGE_SPECIALIZATIONS
}

export const SPECIALIZATION_BY_KEY: Record<string, Specialization> = (() => {
  const result: Record<string, Specialization> = {}
  ALL_SPECIALIZATIONS.forEach(spec => {
    result[getKey(spec)] = spec
  })

  return result
})()
