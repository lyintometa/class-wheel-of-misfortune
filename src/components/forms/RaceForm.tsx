import { FormEvent, useEffect, useRef, useState } from 'react'
import { ALL_FACTION_NAMES, ALL_RACE_NAMES, FACTION_BY_RACE, RACES_BY_FACTION } from '../../constants/races'
import { Faction, RaceName } from '../../models/Race'
import Checkbox from '../common.tsx/Checkbox'
import { BACKGROUND_FACTION_COLOR } from '../../util/colorUtil'

interface RaceFormProps {
  defaultValue?: RaceName[]
  disabled?: boolean
  disabledKeys?: string[]
  id?: string
  value?: RaceName[]
  onChange?: (value: RaceName[]) => void
  onSubmit?: (value: RaceName[]) => void
}

export default function RaceForm({
  defaultValue,
  disabled,
  disabledKeys,
  id,
  value,
  onChange,
  onSubmit
}: RaceFormProps) {
  const isControlled = useRef(value !== undefined)
  const [internalValue, setInternalValue] = useState(defaultValue ?? ALL_RACE_NAMES)

  const valueToUse = disabledKeys
    ? (value ?? internalValue).filter(race => !disabledKeys?.includes(race))
    : (value ?? internalValue)

  if ((isControlled.current && !value) || (!isControlled.current && value)) {
    throw new Error('Cannot switch between uncontrolled and controlled form')
  }

  const handleChange = (races: RaceName[]) => {
    const exceptDisabled = races.filter(race => !disabledKeys?.includes(race))
    onChange?.(exceptDisabled)
    setInternalValue(exceptDisabled)
  }

  const getHandleChange = (faction: Faction) => (races: RaceName[]) =>
    handleChange([...valueToUse.filter(race => FACTION_BY_RACE[race] !== faction), ...races])

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSubmit?.(valueToUse)
  }

  return (
    <form className='flex gap-2 flex-wrap justify-center text-slate-800' id={id} onSubmit={handleSubmit}>
      {ALL_FACTION_NAMES.map(faction => (
        <FactionFormControl
          disabled={disabled}
          disabledKeys={disabledKeys}
          faction={faction}
          key={faction}
          onChange={getHandleChange(faction)}
          value={valueToUse}
        />
      ))}
    </form>
  )
}

interface FactionFormControl {
  disabled?: boolean
  disabledKeys?: string[]
  faction: Faction
  value: RaceName[]
  onChange?: (value: RaceName[]) => void
}

function FactionFormControl({ disabled, disabledKeys, faction, value, onChange }: FactionFormControl) {
  const disabledRaces = disabledKeys?.filter(race => FACTION_BY_RACE[race as RaceName] === faction) ?? []
  const selected = value.filter(value => FACTION_BY_RACE[value] === faction)
  const numTotal = RACES_BY_FACTION[faction].length

  console.log(disabledRaces, numTotal)

  const classCheckboxRef = useRef<HTMLInputElement>(null)

  const classSpecializations = RACES_BY_FACTION[faction]

  const handleChangeAll = () => {
    onChange?.(selected.length === 0 ? classSpecializations : [])
  }

  const handleChange = (race: RaceName) => {
    onChange?.(selected.includes(race) ? selected.filter(select => select !== race) : [...selected, race])
  }

  useEffect(() => {
    if (classCheckboxRef.current === null) return
    if (selected.length === numTotal || selected.length === 0) {
      classCheckboxRef.current.indeterminate = false
      return
    }

    classCheckboxRef.current.indeterminate = true
  }, [selected, numTotal])

  return (
    <div className={`flex flex-col rounded-tr-lg w-60 ${BACKGROUND_FACTION_COLOR[faction]}`}>
      <Checkbox
        disabled={disabled || disabledRaces.length === numTotal}
        ref={classCheckboxRef}
        label={faction}
        pt={{
          root: { className: 'pb-1' },
          label: {
            className: 'px-1 pr-2 bg-slate-900 rounded-br-md',
            style: { transform: 'translate(0, -1px)' }
          },
          checkmark: { className: 'rounded-bl-md rounded-tr-md mt-[-1px] h-[26px]' }
        }}
        checked={selected.length === numTotal}
        onChange={handleChangeAll}
      />

      <div className='flex flex-col flex-1 bg-black bg-opacity-70 px-4 gap-1 py-1'>
        {RACES_BY_FACTION[faction].map(race => (
          <Checkbox
            disabled={disabled || disabledRaces.includes(race)}
            key={race}
            label={race}
            checked={selected.includes(race)}
            onChange={() => handleChange(race)}
          />
        ))}
      </div>
    </div>
  )
}
