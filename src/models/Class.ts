import Specialization from './Specialization'

export default interface Class {
  name: ClassName
  specializations: Specialization[]
}

export enum ClassName {
  Warrior = 'Warrior',
  Paladin = 'Paladin',
  Hunter = 'Hunter',
  Rogue = 'Rogue',
  Priest = 'Priest',
  Shaman = 'Shaman',
  Mage = 'Mage',
  Warlock = 'Warlock',
  Monk = 'Monk',
  Druid = 'Druid',
  DemonHunter = 'Demon Hunter',
  DeathKnight = 'Death Knight',
  Evoker = 'Evoker'
}
