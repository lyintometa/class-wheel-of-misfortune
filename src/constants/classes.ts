import Class, { ClassName } from '../models/Class'
import RoleName from '../models/Role'

export const DEATH_KNIGHT: Class = {
  name: ClassName.DeathKnight,
  specializations: [
    { name: 'Blood', role: RoleName.Tank, className: ClassName.DeathKnight },
    { name: 'Frost', role: RoleName.DamageDealer, className: ClassName.DeathKnight },
    { name: 'Unholy', role: RoleName.DamageDealer, className: ClassName.DeathKnight }
  ]
} as const

export const DEMON_HUNTER: Class = {
  name: ClassName.DemonHunter,
  specializations: [
    { name: 'Havoc', role: RoleName.DamageDealer, className: ClassName.DemonHunter },
    { name: 'Vengeance', role: RoleName.Tank, className: ClassName.DemonHunter }
  ]
} as const

export const DRUID: Class = {
  name: ClassName.Druid,
  specializations: [
    { name: 'Balance', role: RoleName.DamageDealer, className: ClassName.Druid },
    { name: 'Feral', role: RoleName.DamageDealer, className: ClassName.Druid },
    { name: 'Guardian', role: RoleName.Tank, className: ClassName.Druid },
    { name: 'Restoration', role: RoleName.Healer, className: ClassName.Druid }
  ]
} as const

export const EVOKER: Class = {
  name: ClassName.Evoker,
  specializations: [
    { name: 'Augmentation', role: RoleName.DamageDealer, className: ClassName.Evoker },
    { name: 'Devastation', role: RoleName.DamageDealer, className: ClassName.Evoker },
    { name: 'Preservation', role: RoleName.Healer, className: ClassName.Evoker }
  ]
} as const

export const HUNTER: Class = {
  name: ClassName.Hunter,
  specializations: [
    { name: 'Beast Mastery', role: RoleName.DamageDealer, className: ClassName.Hunter },
    { name: 'Marksmanship', role: RoleName.DamageDealer, className: ClassName.Hunter },
    { name: 'Survival', role: RoleName.DamageDealer, className: ClassName.Hunter }
  ]
} as const

export const MAGE: Class = {
  name: ClassName.Mage,
  specializations: [
    { name: 'Arcane', role: RoleName.DamageDealer, className: ClassName.Mage },
    { name: 'Fire', role: RoleName.DamageDealer, className: ClassName.Mage },
    { name: 'Frost', role: RoleName.DamageDealer, className: ClassName.Mage }
  ]
} as const

export const MONK: Class = {
  name: ClassName.Monk,
  specializations: [
    { name: 'Brewmaster', role: RoleName.Tank, className: ClassName.Monk },
    { name: 'Mistweaver', role: RoleName.Healer, className: ClassName.Monk },
    { name: 'Windwalker', role: RoleName.DamageDealer, className: ClassName.Monk }
  ]
} as const

export const PALADIN: Class = {
  name: ClassName.Paladin,
  specializations: [
    { name: 'Holy', role: RoleName.Healer, className: ClassName.Paladin },
    { name: 'Protection', role: RoleName.Tank, className: ClassName.Paladin },
    { name: 'Retribution', role: RoleName.DamageDealer, className: ClassName.Paladin }
  ]
} as const

export const PRIEST: Class = {
  name: ClassName.Priest,
  specializations: [
    { name: 'Discipline', role: RoleName.Healer, className: ClassName.Priest },
    { name: 'Holy', role: RoleName.Healer, className: ClassName.Priest },
    { name: 'Shadow', role: RoleName.DamageDealer, className: ClassName.Priest }
  ]
} as const

export const ROGUE: Class = {
  name: ClassName.Rogue,
  specializations: [
    { name: 'Assassination', role: RoleName.DamageDealer, className: ClassName.Rogue },
    { name: 'Outlaw', role: RoleName.DamageDealer, className: ClassName.Rogue },
    { name: 'Subtlety', role: RoleName.DamageDealer, className: ClassName.Rogue }
  ]
} as const

export const SHAMAN: Class = {
  name: ClassName.Shaman,
  specializations: [
    { name: 'Elemental', role: RoleName.DamageDealer, className: ClassName.Shaman },
    { name: 'Enhancement', role: RoleName.DamageDealer, className: ClassName.Shaman },
    { name: 'Restoration', role: RoleName.Healer, className: ClassName.Shaman }
  ]
} as const

export const WARLOCK: Class = {
  name: ClassName.Warlock,
  specializations: [
    { name: 'Affliction', role: RoleName.DamageDealer, className: ClassName.Warlock },
    { name: 'Demonology', role: RoleName.DamageDealer, className: ClassName.Warlock },
    { name: 'Destruction', role: RoleName.DamageDealer, className: ClassName.Warlock }
  ]
} as const

export const WARRIOR: Class = {
  name: ClassName.Warrior,
  specializations: [
    { name: 'Arms', role: RoleName.DamageDealer, className: ClassName.Warrior },
    { name: 'Fury', role: RoleName.DamageDealer, className: ClassName.Warrior },
    { name: 'Protection', role: RoleName.Tank, className: ClassName.Warrior }
  ]
} as const

export const ALL_CLASSES = [
  WARRIOR,
  PALADIN,
  HUNTER,
  ROGUE,
  PRIEST,
  SHAMAN,
  MAGE,
  WARLOCK,
  MONK,
  DRUID,
  DEMON_HUNTER,
  DEATH_KNIGHT,
  EVOKER
]

export const CLASS_BY_NAME: Record<ClassName, Class> = {
  [ClassName.Warrior]: WARRIOR,
  [ClassName.Paladin]: PALADIN,
  [ClassName.Hunter]: HUNTER,
  [ClassName.Rogue]: ROGUE,
  [ClassName.Priest]: PRIEST,
  [ClassName.Shaman]: SHAMAN,
  [ClassName.Mage]: MAGE,
  [ClassName.Warlock]: WARLOCK,
  [ClassName.Monk]: MONK,
  [ClassName.Druid]: DRUID,
  [ClassName.DemonHunter]: DEMON_HUNTER,
  [ClassName.DeathKnight]: DEATH_KNIGHT,
  [ClassName.Evoker]: EVOKER
}
