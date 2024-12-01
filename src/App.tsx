import { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import RaiderList from './components/RaiderList'
import Raider from './models/Raider'
import Specialization from './models/Specialization'
import SpecializationForm from './components/forms/SpecializationForm3'
import WheelOfMisfortune, { WheelOfMisfortuneOption } from './components/WheelOfMisfortune'
import Container from './components/common.tsx/Container'
import { BACKGROUND_CLASS_COLOR, BACKGROUND_FACTION_COLOR, BACKGROUND_ROLE_COLOR } from './util/colorUtil'
import {
  ALL_SPECIALIZATION_KEYS,
  ALL_SPECIALIZATIONS,
  SPECIALIZATION_BY_KEY,
  SPECIALIZATIONS_BY_ROLE
} from './constants/specializations'
import SpecializationDialog from './components/overlays/SpecializationDialog'
import useLocalStorage from './hooks/useLocalStorage'
import './App.css'
import Button from './components/common.tsx/Button'
import useStableMemo from './hooks/useStableMemo'
import { getKey } from './util/utils'
import { useDisabledSpecializationKeys } from './hooks/useDisabledSpecializationKeys'
import { RaceName } from './models/Race'
import { ALL_RACE_NAMES, FACTION_BY_RACE, RACES_BY_CLASS } from './constants/races'
import RaceForm from './components/forms/RaceForm'
import { ClassName } from './models/Class'
import RoleName from './models/Role'
import RoleDialog from './components/overlays/RoleDialog'
import { RoleContext } from './contexts/RoleContext'
import { CLASS_BY_NAME } from './constants/classes'
import { distinct, getShuffled, intersect } from './util/arrayUtils'
import CheckBoxGroup from './components/forms/CheckboxGroup'

enum RollType {
  Role = 'Role',
  Class = 'Class',
  Spec = 'Spec',
  Race = 'Race',
  Sex = 'Sex'
}

enum TakenRule {
  SpecOnly = 'Spec Only',
  ClassRole = 'Class and Role',
  Class = 'Class'
}

function App() {
  const disabledSpecKeys = useDisabledSpecializationKeys()
  const roleSettings = useContext(RoleContext)

  const [rollType, setRollType] = useState<RollType>(RollType.Spec)
  const [takenRule, setTakenRule] = useState<TakenRule>(TakenRule.ClassRole)
  const [isSpinning, setIsSpinning] = useState(false)
  const [showDialog, setShowDialog] = useState(false)
  const [showRoleDialog, setShowRoleDialog] = useState(false)
  const [raiderData, setRaiderData] = useLocalStorage<Raider[]>('RAIDER_DATA', [])
  const [selectedRaiderName, setSelectedRaiderName] = useState<string>()
  const selectedRaider = raiderData.find(raider => raider.name === selectedRaiderName)

  const otherRaiders = useStableMemo(
    useCallback(() => getOtherRaiders(raiderData, selectedRaider), [raiderData, selectedRaider])
  )

  const handleRaiderInvite = (name: string) => {
    setRaiderData(prev => [...prev, { name: name, disabled: {}, rolls: {} }])
  }

  const handleRaiderMove = (name: string, direction: boolean) => {
    setRaiderData(prev => {
      const newRaiders = [...prev]
      const i = prev.findIndex(raider => raider.name === name)
      const j = direction ? i + 1 : i - 1

      if (j < 0 || j >= newRaiders.length) return prev

      const t = newRaiders[i]
      newRaiders[i] = newRaiders[j]
      newRaiders[j] = t

      return newRaiders
    })
  }

  const handleRaiderShuffle = () => {
    setRaiderData(prev => getShuffled(prev))
  }

  const handleRaiderReset = (name: string, raider: Raider) => {
    setRaiderData(prev => {
      const newRaiders = [...prev]
      const i = prev.findIndex(prevRaider => prevRaider.name === name)
      newRaiders[i] = raider
      return newRaiders
    })
  }

  const handleRaiderKick = (name: string) => {
    setRaiderData(prev => prev.filter(raider => raider.name !== name))
  }

  const handleSetRaiderSpecializations = (specs: Specialization[]) => {
    const keys = specs.map(getKey)
    const disabledKeys = ALL_SPECIALIZATION_KEYS.filter(key => !keys.includes(key))

    setRaiderData(prev => {
      if (!selectedRaider) return prev
      const newRaiders = [...prev]
      const i = newRaiders.findIndex(raider => raider.name === selectedRaider.name)
      newRaiders[i] = { ...prev[i], disabled: { ...prev[i].disabled, specKeys: disabledKeys } }
      return newRaiders
    })
  }

  const handleSetRaiderRaces = (races: RaceName[]) => {
    setRaiderData(prev => {
      if (!selectedRaider) return prev
      const newRaiders = [...prev]
      const i = newRaiders.findIndex(raider => raider.name === selectedRaider.name)
      newRaiders[i] = {
        ...prev[i],
        disabled: {
          ...prev[i].disabled,
          races: ALL_RACE_NAMES.filter(race => !races.includes(race))
        }
      }
      return newRaiders
    })
  }

  const selectedRaiderSpecs = useMemo(
    () =>
      ALL_SPECIALIZATIONS /* .filter(spec => !disabledSpecKeys.includes(getKey(spec))) */.filter(
        spec => !selectedRaider?.disabled.specKeys?.includes(getKey(spec))
      ),
    /* .filter(spec => selectedRaider?.rolls.role === undefined || selectedRaider?.rolls.role === spec.role)
        .filter(spec => selectedRaider?.rolls.class === undefined || selectedRaider?.rolls.class === spec.className) */ [
      selectedRaider
      /* disabledSpecKeys */
    ]
  )

  const allowedRaiderSpecKeysForPreviousRolls = useStableMemo(
    useCallback(() => getAllowedSpecKeysForRoll(selectedRaider, rollType), [selectedRaider, rollType])
  )

  //console.log('allowedFromPrev', allowedRaiderSpecKeysForPreviousRolls)

  const disabledBecauseOfPreviousRolls = invertSpecKeys(allowedRaiderSpecKeysForPreviousRolls)

  console.log('disabledBecauseOfPreviousRolls', disabledBecauseOfPreviousRolls)

  const impossibleRaces = useMemo(() => {
    if (selectedRaider?.rolls.specKey === undefined) return []
    const className = SPECIALIZATION_BY_KEY[selectedRaider.rolls.specKey].className
    return ALL_RACE_NAMES.filter(race => !RACES_BY_CLASS[className].includes(race))
  }, [selectedRaider])

  const selectedraiderRaces = useMemo(
    () =>
      ALL_RACE_NAMES.filter(race => !impossibleRaces.includes(race)).filter(
        race => !selectedRaider?.disabled.races?.includes(race)
      ),
    [impossibleRaces, selectedRaider?.disabled.races]
  )

  const takenByOthersSpecKeys = useStableMemo<string[]>(
    useCallback(() => {
      switch (takenRule) {
        case TakenRule.SpecOnly:
          return otherRaiders.map(raider => raider.rolls.specKey).filter(key => key !== undefined)
        case TakenRule.ClassRole:
          return distinct(
            otherRaiders
              .map(raider => raider.rolls.specKey)
              .filter(key => key !== undefined)
              .flatMap(key => {
                const spec = SPECIALIZATION_BY_KEY[key]
                return CLASS_BY_NAME[spec.className].specializations
                  .filter(classSpec => classSpec.role === spec.role)
                  .map(getKey)
              })
          )
        case TakenRule.Class:
          return distinct(
            otherRaiders
              .map(raider => raider.rolls.specKey)
              .filter(key => key !== undefined)
              .flatMap(key => {
                const spec = SPECIALIZATION_BY_KEY[key]
                return CLASS_BY_NAME[spec.className].specializations.map(getKey)
              })
          )
        default:
          return []
      }
    }, [otherRaiders, takenRule])
  )

  const handleRollRole = (role: RoleName) => {
    setRaiderData(prev => {
      if (!selectedRaider) return prev
      const newRaiders = [...prev]
      const i = newRaiders.findIndex(raider => raider.name === selectedRaider.name)
      newRaiders[i] = { ...prev[i], rolls: { ...prev[i].rolls, role: role } }
      return newRaiders
    })
    setIsSpinning(false)
  }

  const handleRollClass = (className: ClassName) => {
    setRaiderData(prev => {
      if (!selectedRaider) return prev
      const newRaiders = [...prev]
      const i = newRaiders.findIndex(raider => raider.name === selectedRaider.name)
      newRaiders[i] = { ...prev[i], rolls: { ...prev[i].rolls, class: className } }
      return newRaiders
    })
    setIsSpinning(false)
  }

  const handleRollSpecialization = (spec: Specialization) => {
    setRaiderData(prev => {
      if (!selectedRaider) return prev
      const newRaiders = [...prev]
      const i = newRaiders.findIndex(raider => raider.name === selectedRaider.name)
      newRaiders[i] = { ...prev[i], rolls: { ...prev[i].rolls, specKey: getKey(spec) } }
      return newRaiders
    })
    setIsSpinning(false)
  }

  const handleRollRace = (race: RaceName) => {
    setRaiderData(prev => {
      if (!selectedRaider) return prev
      const newRaiders = [...prev]
      const i = newRaiders.findIndex(raider => raider.name === selectedRaider.name)
      newRaiders[i] = { ...prev[i], rolls: { ...prev[i].rolls, race: race } }
      return newRaiders
    })
    setIsSpinning(false)
  }

  const handleRollSex = (sex: string) => {
    setRaiderData(prev => {
      if (!selectedRaider) return prev
      const newRaiders = [...prev]
      const i = newRaiders.findIndex(raider => raider.name === selectedRaider.name)
      newRaiders[i] = { ...prev[i], rolls: { ...prev[i].rolls, sex: sex } }
      return newRaiders
    })
    setIsSpinning(false)
  }

  const availableByRole: Record<RoleName, number> = useMemo(
    () => ({
      [RoleName.Tank]: roleSettings.numTanks - getNumRole(otherRaiders, RoleName.Tank).length,
      [RoleName.Healer]: roleSettings.numHeals - getNumRole(otherRaiders, RoleName.Healer).length,
      [RoleName.DamageDealer]: Math.max(
        raiderData.length -
          roleSettings.numTanks -
          roleSettings.numHeals -
          getNumRole(otherRaiders, RoleName.DamageDealer).length,
        0
      )
    }),
    [otherRaiders, raiderData.length, roleSettings.numHeals, roleSettings.numTanks]
  )

  const availableRoles = Object.values(RoleName).filter(role => availableByRole[role] > 0)

  console.log(availableRoles)

  const rollableSpecs = selectedRaiderSpecs
    .filter(spec => !disabledSpecKeys.includes(getKey(spec)))
    .filter(spec => !takenByOthersSpecKeys.includes(getKey(spec)))
    .filter(spec => availableByRole[spec.role] > 0)

  console.log(rollableSpecs)

  const roleOptions = useStableMemo<WheelOfMisfortuneOption<RoleName>[]>(
    useCallback(
      () =>
        [
          ...Array<RoleName.Tank>(availableByRole[RoleName.Tank]).fill(RoleName.Tank),
          ...Array<RoleName.Healer>(availableByRole[RoleName.Healer]).fill(RoleName.Healer),
          ...Array<RoleName.DamageDealer>(availableByRole[RoleName.DamageDealer]).fill(RoleName.DamageDealer)
        ]
          .filter(role => selectedRaiderSpecs.some(spec => spec.role === role))
          .filter(role => availableRoles.includes(role))
          .map((role, i) => ({
            label: role,
            value: role,
            key: role + i,
            className: BACKGROUND_ROLE_COLOR[role]
          })),
      [availableByRole, availableRoles, selectedRaiderSpecs]
    )
  )

  const specOptions = useStableMemo<WheelOfMisfortuneOption<Specialization>[]>(
    useCallback(
      () =>
        rollableSpecs.map(spec => ({
          label: `${spec.name} - ${spec.className}`,
          value: spec,
          key: getKey(spec),
          className: BACKGROUND_CLASS_COLOR[spec.className]
        })),
      [rollableSpecs]
    )
  )

  const classOptions = useStableMemo<WheelOfMisfortuneOption<ClassName>[]>(
    useCallback(
      () =>
        Object.values(ClassName)
          .filter(playableClass => specOptions.some(spec => spec.value.className === playableClass))
          .map(role => ({
            label: role,
            value: role,
            key: role,
            className: BACKGROUND_CLASS_COLOR[role]
          })),
      [specOptions]
    )
  )

  const raceOptions = useStableMemo<WheelOfMisfortuneOption<RaceName>[]>(
    useCallback(
      () =>
        selectedraiderRaces.map(race => ({
          label: race,
          value: race,
          key: race,
          className: BACKGROUND_FACTION_COLOR[FACTION_BY_RACE[race]]
        })),
      [selectedraiderRaces]
    )
  )

  const sexOptions = useStableMemo<WheelOfMisfortuneOption<string>[]>(
    useCallback(
      () => [
        {
          label: 'Male',
          value: 'Male',
          key: 'Male',
          className: BACKGROUND_CLASS_COLOR[ClassName.Shaman]
        },
        {
          label: 'Female',
          value: 'Female',
          key: 'Female',
          className: BACKGROUND_CLASS_COLOR[ClassName.Paladin]
        }
      ],
      []
    )
  )

  return (
    <div className='background flex w-full h-full'>
      <div className='flex flex-1 p-8 gap-4 content-center'>
        <Container className='relative flex flex-col gap-8 p-8 rounded-md'>
          <div className='absolute'>
            {Object.values(RollType).map(type => (
              <Button className='w-20' disabled={rollType === type} onClick={() => setRollType(type)} key={type}>
                {type}
              </Button>
            ))}
          </div>
          <div className='absolute right-8'>
            {Object.values(TakenRule).map(type => (
              <Button className='w-auto' disabled={takenRule === type} onClick={() => setTakenRule(type)} key={type}>
                {type}
              </Button>
            ))}
          </div>

          <p className='text-slate-100 text-3xl text-center'>Spin to Win!</p>
          <div className='w-[1060px]'>
            {rollType === RollType.Role && (
              <WheelOfMisfortune
                key={selectedRaider?.name}
                options={roleOptions}
                onSpinStart={() => setIsSpinning(true)}
                onChange={handleRollRole}
              />
            )}
            {rollType === RollType.Class && (
              <WheelOfMisfortune
                key={selectedRaider?.name}
                options={classOptions}
                onSpinStart={() => setIsSpinning(true)}
                onChange={handleRollClass}
              />
            )}
            {rollType === RollType.Spec && (
              <WheelOfMisfortune
                key={selectedRaider?.name}
                options={specOptions}
                onSpinStart={() => setIsSpinning(true)}
                onChange={handleRollSpecialization}
              />
            )}
            {rollType === RollType.Race && (
              <WheelOfMisfortune
                key={selectedRaider?.name}
                options={raceOptions}
                onSpinStart={() => setIsSpinning(true)}
                onChange={handleRollRace}
              />
            )}
            {rollType === RollType.Sex && (
              <WheelOfMisfortune
                key={selectedRaider?.name}
                options={sexOptions}
                onSpinStart={() => setIsSpinning(true)}
                onChange={handleRollSex}
              />
            )}
          </div>
        </Container>
        <SpecializationDialog isOpen={showDialog} onClose={() => setShowDialog(false)} />
        <RoleDialog isOpen={showRoleDialog} onClose={() => setShowRoleDialog(false)} />

        <div className='flex flex-col flex-1 gap-4'>
          <Container className='relative flex flex-col p-8 flex-grow'>
            <RaiderList
              raiders={raiderData}
              selected={selectedRaider}
              onInvite={handleRaiderInvite}
              onMove={handleRaiderMove}
              onKick={handleRaiderKick}
              onSelect={setSelectedRaiderName}
              onChange={handleRaiderReset}
              onShuffle={handleRaiderShuffle}
            />

            <Button className='absolute bottom-8 right-8' onClick={() => setShowRoleDialog(true)}>
              Raid Settings
            </Button>
          </Container>
          {(rollType === RollType.Role || rollType === RollType.Class || rollType === RollType.Spec) && (
            <Container className='relative flex flex-col min-h-32 p-8 rounded-md gap-4 justify-between'>
              {selectedRaider ? (
                <SpecializationForm
                  value={selectedRaiderSpecs}
                  onChange={handleSetRaiderSpecializations}
                  disabled={isSpinning}
                  disabledKeys={disabledSpecKeys.concat(takenByOthersSpecKeys).concat(disabledBecauseOfPreviousRolls)}
                />
              ) : (
                <p className=' text-xl'>Select a raider to proceed</p>
              )}
              <Button className='absolute bottom-8 right-8 w-24' onClick={() => setShowDialog(true)}>
                Global Settings
              </Button>
            </Container>
          )}
          {rollType === RollType.Race && (
            <Container className='flex flex-col p-8 rounded-md gap-4 justify-between'>
              <RaceForm
                value={selectedraiderRaces}
                onChange={handleSetRaiderRaces}
                disabled={isSpinning}
                disabledKeys={impossibleRaces}
              />
            </Container>
          )}
          {rollType === RollType.Sex && (
            <Container className='flex flex-col p-8 rounded-md gap-4 justify-between'>
              <p>Ja bitte</p>
            </Container>
          )}
        </div>
      </div>
    </div>
  )
}

export default App

const getAllowedSpecKeysForRoll = (raider: Raider | undefined, rollType: RollType): string[] => {
  if (raider === undefined) return ALL_SPECIALIZATION_KEYS

  const { role, class: playableClass } = raider.rolls

  switch (rollType) {
    case RollType.Spec:
      if (role && playableClass)
        return intersect(
          SPECIALIZATIONS_BY_ROLE[role].map(getKey),
          CLASS_BY_NAME[playableClass].specializations.map(getKey)
        )
      if (playableClass) return CLASS_BY_NAME[playableClass].specializations.map(getKey)
      if (role) return SPECIALIZATIONS_BY_ROLE[role].map(getKey)
      return ALL_SPECIALIZATION_KEYS

    case RollType.Class:
      if (role) return SPECIALIZATIONS_BY_ROLE[role].map(getKey)
      return ALL_SPECIALIZATION_KEYS

    case RollType.Role:
      return ALL_SPECIALIZATION_KEYS

    default:
      return ALL_SPECIALIZATION_KEYS
  }
}

const invertSpecKeys = (specKeys: string[]): string[] => ALL_SPECIALIZATION_KEYS.filter(key => !specKeys.includes(key))

const getOtherRaiders = (raiders: Raider[], selected?: Raider) =>
  selected ? raiders.filter(raider => raider !== selected) : raiders

const getNumRole = (raiders: Raider[], role: RoleName) =>
  raiders.filter(
    raider =>
      raider.rolls.role === role || (raider.rolls.specKey && SPECIALIZATION_BY_KEY[raider.rolls.specKey].role === role)
  )
