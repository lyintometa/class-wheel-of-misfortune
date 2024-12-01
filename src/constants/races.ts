import Class, { ClassName } from '../models/Class'
import { Faction, RaceName } from '../models/Race'
import { CLASS_BY_NAME } from './classes'

export const RACES_BY_FACTION: Record<Faction, RaceName[]> = {
  [Faction.Horde]: [
    RaceName.Orc,
    RaceName.Undead,
    RaceName.Tauren,
    RaceName.Troll,
    RaceName.BloodElf,
    RaceName.Goblin,
    RaceName.Nightborne,
    RaceName.HighmountainTauren,
    RaceName.MagHarOrc,
    RaceName.ZandalariTroll,
    RaceName.Vulpera
  ],
  [Faction.Alliance]: [
    RaceName.Human,
    RaceName.Dwarf,
    RaceName.NightElf,
    RaceName.Gnome,
    RaceName.Draenei,
    RaceName.Worgen,
    RaceName.VoidElf,
    RaceName.LightforgedDraenei,
    RaceName.DarkIronDwarf,
    RaceName.KulTiran,
    RaceName.Mechagnome
  ],
  [Faction.Neutral]: [RaceName.Pandaren, RaceName.Dracthyr, RaceName.Earthen]
}

export const FACTION_BY_RACE: Record<RaceName, Faction> = (() => {
  const result = {} as Record<RaceName, Faction>

  Object.entries(RACES_BY_FACTION).forEach(([faction, raceNames]) =>
    raceNames.forEach(raceName => {
      result[raceName as RaceName] = faction as Faction
    })
  )

  return result
})()

export const RACES_BY_CLASS: Record<ClassName, RaceName[]> = {
  [ClassName.Warrior]: [
    RaceName.Orc,
    RaceName.Undead,
    RaceName.Tauren,
    RaceName.Troll,
    RaceName.BloodElf,
    RaceName.Goblin,
    RaceName.Nightborne,
    RaceName.HighmountainTauren,
    RaceName.MagHarOrc,
    RaceName.ZandalariTroll,
    RaceName.Vulpera,
    RaceName.Human,
    RaceName.Dwarf,
    RaceName.NightElf,
    RaceName.Gnome,
    RaceName.Draenei,
    RaceName.Worgen,
    RaceName.VoidElf,
    RaceName.LightforgedDraenei,
    RaceName.DarkIronDwarf,
    RaceName.KulTiran,
    RaceName.Mechagnome,
    RaceName.Pandaren,
    RaceName.Dracthyr,
    RaceName.Earthen
  ],
  [ClassName.Paladin]: [
    RaceName.Tauren,
    RaceName.BloodElf,
    RaceName.ZandalariTroll,
    RaceName.Human,
    RaceName.Dwarf,
    RaceName.Draenei,
    RaceName.LightforgedDraenei,
    RaceName.DarkIronDwarf,
    RaceName.Earthen
  ],
  [ClassName.Hunter]: [
    RaceName.Orc,
    RaceName.Undead,
    RaceName.Tauren,
    RaceName.Troll,
    RaceName.BloodElf,
    RaceName.Goblin,
    RaceName.Nightborne,
    RaceName.HighmountainTauren,
    RaceName.MagHarOrc,
    RaceName.ZandalariTroll,
    RaceName.Vulpera,
    RaceName.Human,
    RaceName.Dwarf,
    RaceName.NightElf,
    RaceName.Gnome,
    RaceName.Draenei,
    RaceName.Worgen,
    RaceName.VoidElf,
    RaceName.LightforgedDraenei,
    RaceName.DarkIronDwarf,
    RaceName.KulTiran,
    RaceName.Mechagnome,
    RaceName.Pandaren,
    RaceName.Dracthyr,
    RaceName.Earthen
  ],
  [ClassName.Rogue]: [
    RaceName.Orc,
    RaceName.Undead,
    RaceName.Tauren,
    RaceName.Troll,
    RaceName.BloodElf,
    RaceName.Goblin,
    RaceName.Nightborne,
    RaceName.HighmountainTauren,
    RaceName.MagHarOrc,
    RaceName.ZandalariTroll,
    RaceName.Vulpera,
    RaceName.Human,
    RaceName.Dwarf,
    RaceName.NightElf,
    RaceName.Gnome,
    RaceName.Draenei,
    RaceName.Worgen,
    RaceName.VoidElf,
    RaceName.LightforgedDraenei,
    RaceName.DarkIronDwarf,
    RaceName.KulTiran,
    RaceName.Mechagnome,
    RaceName.Pandaren,
    RaceName.Dracthyr,
    RaceName.Earthen
  ],
  [ClassName.Priest]: [
    RaceName.Orc,
    RaceName.Undead,
    RaceName.Tauren,
    RaceName.Troll,
    RaceName.BloodElf,
    RaceName.Goblin,
    RaceName.Nightborne,
    RaceName.HighmountainTauren,
    RaceName.MagHarOrc,
    RaceName.ZandalariTroll,
    RaceName.Vulpera,
    RaceName.Human,
    RaceName.Dwarf,
    RaceName.NightElf,
    RaceName.Gnome,
    RaceName.Draenei,
    RaceName.Worgen,
    RaceName.VoidElf,
    RaceName.LightforgedDraenei,
    RaceName.DarkIronDwarf,
    RaceName.KulTiran,
    RaceName.Mechagnome,
    RaceName.Pandaren,
    RaceName.Dracthyr,
    RaceName.Earthen
  ],
  [ClassName.Shaman]: [
    RaceName.Orc,
    RaceName.Tauren,
    RaceName.Troll,
    RaceName.Goblin,
    RaceName.HighmountainTauren,
    RaceName.MagHarOrc,
    RaceName.ZandalariTroll,
    RaceName.Vulpera,
    RaceName.Dwarf,
    RaceName.Draenei,
    RaceName.DarkIronDwarf,
    RaceName.KulTiran,
    RaceName.Pandaren,
    RaceName.Earthen
  ],
  [ClassName.Mage]: [
    RaceName.Orc,
    RaceName.Undead,
    RaceName.Tauren,
    RaceName.Troll,
    RaceName.BloodElf,
    RaceName.Goblin,
    RaceName.Nightborne,
    RaceName.HighmountainTauren,
    RaceName.MagHarOrc,
    RaceName.ZandalariTroll,
    RaceName.Vulpera,
    RaceName.Human,
    RaceName.Dwarf,
    RaceName.NightElf,
    RaceName.Gnome,
    RaceName.Draenei,
    RaceName.Worgen,
    RaceName.VoidElf,
    RaceName.LightforgedDraenei,
    RaceName.DarkIronDwarf,
    RaceName.KulTiran,
    RaceName.Mechagnome,
    RaceName.Pandaren,
    RaceName.Dracthyr,
    RaceName.Earthen
  ],
  [ClassName.Warlock]: [
    RaceName.Orc,
    RaceName.Undead,
    RaceName.Tauren,
    RaceName.Troll,
    RaceName.BloodElf,
    RaceName.Goblin,
    RaceName.Nightborne,
    RaceName.HighmountainTauren,
    RaceName.MagHarOrc,
    RaceName.ZandalariTroll,
    RaceName.Vulpera,
    RaceName.Human,
    RaceName.Dwarf,
    RaceName.NightElf,
    RaceName.Gnome,
    RaceName.Draenei,
    RaceName.Worgen,
    RaceName.VoidElf,
    RaceName.LightforgedDraenei,
    RaceName.DarkIronDwarf,
    RaceName.KulTiran,
    RaceName.Mechagnome,
    RaceName.Pandaren,
    RaceName.Dracthyr,
    RaceName.Earthen
  ],
  [ClassName.Monk]: [
    RaceName.Orc,
    RaceName.Undead,
    RaceName.Tauren,
    RaceName.Troll,
    RaceName.BloodElf,
    RaceName.Goblin,
    RaceName.Nightborne,
    RaceName.HighmountainTauren,
    RaceName.MagHarOrc,
    RaceName.ZandalariTroll,
    RaceName.Vulpera,
    RaceName.Human,
    RaceName.Dwarf,
    RaceName.NightElf,
    RaceName.Gnome,
    RaceName.Draenei,
    RaceName.Worgen,
    RaceName.VoidElf,
    RaceName.LightforgedDraenei,
    RaceName.DarkIronDwarf,
    RaceName.KulTiran,
    RaceName.Mechagnome,
    RaceName.Pandaren,
    RaceName.Earthen
  ],
  [ClassName.Druid]: [
    RaceName.Tauren,
    RaceName.Troll,
    RaceName.HighmountainTauren,
    RaceName.ZandalariTroll,
    RaceName.NightElf,
    RaceName.Worgen,
    RaceName.KulTiran
  ],
  [ClassName.DemonHunter]: [RaceName.BloodElf, RaceName.NightElf],
  [ClassName.DeathKnight]: [
    RaceName.Orc,
    RaceName.Undead,
    RaceName.Tauren,
    RaceName.Troll,
    RaceName.BloodElf,
    RaceName.Goblin,
    RaceName.Nightborne,
    RaceName.HighmountainTauren,
    RaceName.MagHarOrc,
    RaceName.ZandalariTroll,
    RaceName.Vulpera,
    RaceName.Human,
    RaceName.Dwarf,
    RaceName.NightElf,
    RaceName.Gnome,
    RaceName.Draenei,
    RaceName.Worgen,
    RaceName.VoidElf,
    RaceName.LightforgedDraenei,
    RaceName.DarkIronDwarf,
    RaceName.KulTiran,
    RaceName.Mechagnome,
    RaceName.Pandaren,
    RaceName.Earthen
  ],
  [ClassName.Evoker]: [RaceName.Dracthyr]
}

export const CLASSES_BY_RACE: Record<RaceName, Class[]> = (() => {
  const result = {} as Record<RaceName, Class[]>

  Object.entries(RACES_BY_CLASS).forEach(([className, raceNames]) =>
    raceNames.forEach(raceName => {
      result[raceName as RaceName] ??= []
      return result[raceName as RaceName].push(CLASS_BY_NAME[className as ClassName])
    })
  )

  return result
})()

export const ALL_RACE_NAMES = Object.values(RaceName)
export const ALL_FACTION_NAMES = Object.values(Faction)
