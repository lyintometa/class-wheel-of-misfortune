import { ClassName } from '../models/Class'
import { Faction } from '../models/Race'
import RoleName from '../models/Role'

export const BACKGROUND_CLASS_COLOR: Record<ClassName, string> = {
  [ClassName.DeathKnight]: 'bg-class-death-knight',
  [ClassName.DemonHunter]: 'bg-class-demon-hunter',
  [ClassName.Druid]: 'bg-class-druid',
  [ClassName.Evoker]: 'bg-class-evoker',
  [ClassName.Hunter]: 'bg-class-hunter',
  [ClassName.Mage]: 'bg-class-mage',
  [ClassName.Monk]: 'bg-class-monk',
  [ClassName.Paladin]: 'bg-class-paladin',
  [ClassName.Priest]: 'bg-class-priest',
  [ClassName.Rogue]: 'bg-class-rogue',
  [ClassName.Shaman]: 'bg-class-shaman',
  [ClassName.Warlock]: 'bg-class-warlock',
  [ClassName.Warrior]: 'bg-class-warrior'
}

export const BACKGROUND_ROLE_COLOR: Record<RoleName, string> = {
  [RoleName.Tank]: 'bg-sky-500',
  [RoleName.Healer]: 'bg-green-600',
  [RoleName.DamageDealer]: 'bg-red-400'
}

export const BACKGROUND_FACTION_COLOR: Record<Faction, string> = {
  [Faction.Horde]: 'bg-faction-horde',
  [Faction.Alliance]: 'bg-faction-alliance',
  [Faction.Neutral]: 'bg-faction-neutral'
}
