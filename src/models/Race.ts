import { ClassName } from './Class'

export default interface Race {
  name: RaceName
  playableClasses: ClassName[]
}

export enum RaceName {
  Orc = 'Orc',
  Undead = 'Undead',
  Tauren = 'Tauren',
  Troll = 'Troll',
  BloodElf = 'Blood Elf',
  Goblin = 'Goblin',
  Nightborne = 'Nightborne',
  HighmountainTauren = 'Highmountain Tauren',
  MagHarOrc = "Mag'har Orc",
  ZandalariTroll = 'Zandalari Troll',
  Vulpera = 'Vulpera',

  Human = 'Human',
  Dwarf = 'Dwarf',
  NightElf = 'NightElf',
  Gnome = 'Gnome',
  Draenei = 'Draenei',
  Worgen = 'Worgen',
  VoidElf = 'Void Elf',
  LightforgedDraenei = 'Lightforged Draenei',
  DarkIronDwarf = 'Dark Iron Dwarf',
  KulTiran = 'Kul Tiran',
  Mechagnome = 'Mechagnome',

  Pandaren = 'Pandaren',
  Dracthyr = 'Dracthyr',
  Earthen = 'Earthen'
}

export enum Faction {
  Horde = 'Horde',
  Alliance = 'Alliance',
  Neutral = 'Neutral'
}
