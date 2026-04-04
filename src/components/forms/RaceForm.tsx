import { SubmitEvent, useRef, useState } from 'react'

import CheckBoxGroup, { CheckboxGroupOption } from 'components/forms/CheckboxGroup'
import { ALL_FACTION_NAMES, ALL_RACE_NAMES, FACTION_BY_RACE, RACES_BY_FACTION } from 'constants/races'
import { Faction, RaceName } from 'models/Race'
import { BACKGROUND_FACTION_COLOR } from 'util/colorUtil'

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
  onSubmit,
}: RaceFormProps) {
  const isControlled = useRef(value !== undefined)
  const [internalValue, setInternalValue] = useState(defaultValue ?? ALL_RACE_NAMES)

  const valueToUse =
    disabledKeys ? (value ?? internalValue).filter(race => !disabledKeys?.includes(race)) : (value ?? internalValue)

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

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSubmit?.(valueToUse)
  }

  return (
    <form className='flex flex-wrap justify-center gap-2' id={id} onSubmit={handleSubmit}>
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

  return (
    <CheckBoxGroup
      checked={selected}
      className={`w-60 ${BACKGROUND_FACTION_COLOR[faction]}`}
      label={faction}
      options={RACES_BY_FACTION[faction].map<CheckboxGroupOption<RaceName>>(race => ({
        disabled: disabled || disabledRaces.includes(race),
        key: race,
        label: race,
        value: race,
      }))}
      onChange={onChange}
    />
  )
}
