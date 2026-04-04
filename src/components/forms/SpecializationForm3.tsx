import { FormEvent, RefObject, useEffect, useMemo, useRef, useState } from 'react'

import Checkbox from 'components/common/Checkbox'
import { ALL_CLASSES } from 'constants/classes'
import { ALL_SPECIALIZATIONS, SPECIALIZATIONS_BY_ROLE, SPECIALIZATION_BY_KEY } from 'constants/specializations'
import Class, { ClassName } from 'models/Class'
import RoleName from 'models/Role'
import Specialization from 'models/Specialization'
import { BACKGROUND_CLASS_COLOR } from 'util/colorUtil'
import { getKey } from 'util/utils'

import CheckBoxGroup, { CheckboxGroupOption } from './CheckboxGroup'

interface SpecializationFormProps {
  defaultValue?: Specialization[]
  disabled?: boolean
  disabledKeys?: string[]
  id?: string
  value?: Specialization[]
  onChange?: (value: Specialization[]) => void
  onSubmit?: (value: Specialization[]) => void
}

export default function SpecializationForm({
  defaultValue,
  disabled,
  disabledKeys,
  id,
  value,
  onChange,
  onSubmit,
}: SpecializationFormProps) {
  const isControlled = useRef(value !== undefined)
  const [internalValue, setInternalValue] = useState(defaultValue ?? ALL_SPECIALIZATIONS)

  const valueToUse =
    disabledKeys ?
      (value ?? internalValue).filter(spec => !disabledKeys?.includes(getKey(spec)))
    : (value ?? internalValue)

  if ((isControlled.current && !value) || (!isControlled.current && value)) {
    throw new Error('Cannot switch between uncontrolled and controlled form')
  }

  const handleChange = (specs: Specialization[]) => {
    const exceptDisabled = specs.filter(spec => !disabledKeys?.includes(getKey(spec)))
    onChange?.(exceptDisabled)
    setInternalValue(exceptDisabled)
  }

  const handleChangeRole = (role: RoleName, checked: boolean) => (checked ? handleAllRole(role) : handleNoRole(role))
  const handleChangeAll = (checked: boolean) => (checked ? handleChange(ALL_SPECIALIZATIONS) : handleChange([]))

  const handleAllRole = (role: RoleName) =>
    handleChange([...valueToUse.filter(spec => spec.role !== role), ...SPECIALIZATIONS_BY_ROLE[role]])

  const handleNoRole = (role: RoleName) => handleChange(valueToUse.filter(spec => spec.role !== role))

  const getHandleChange = (className: ClassName) => (specs: Specialization[]) =>
    handleChange([...valueToUse.filter(spec => spec.className !== className), ...specs])

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSubmit?.(valueToUse)
  }

  return (
    <form className='flex flex-wrap justify-center gap-2 text-slate-800' id={id} onSubmit={handleSubmit}>
      {ALL_CLASSES.map(playableClass => (
        <ClassFormControl
          disabled={disabled}
          disabledKeys={disabledKeys}
          playableClass={playableClass}
          key={playableClass.name}
          onChange={getHandleChange(playableClass.name)}
          value={valueToUse}
        />
      ))}
      <div className='w-16' />
      <RoleFormControl
        disabled={disabled}
        disabledKeys={disabledKeys}
        onChange={handleChangeRole}
        onChangeAll={handleChangeAll}
        value={valueToUse}
      />
    </form>
  )
}

interface ClassFormControlProps {
  disabled?: boolean
  disabledKeys?: string[]
  playableClass: Class
  value: Specialization[]
  onChange?: (value: Specialization[]) => void
}

function ClassFormControl({ disabled, disabledKeys, playableClass, value, onChange }: ClassFormControlProps) {
  const disabledSpecs = disabledKeys?.filter(key => key.startsWith(playableClass.name)) ?? []
  const selected = value.filter(value => value.className === playableClass.name)

  return (
    <CheckBoxGroup
      checked={selected}
      className={BACKGROUND_CLASS_COLOR[playableClass.name]}
      label={playableClass.name}
      options={playableClass.specializations.map<CheckboxGroupOption<Specialization>>(spec => ({
        disabled: disabled || disabledSpecs.includes(getKey(spec)),
        key: spec.name,
        label: spec.name,
        value: spec,
      }))}
      onChange={onChange}
    />
  )
}

interface RoleFormControlProps {
  disabled?: boolean
  disabledKeys?: string[]
  value: Specialization[]
  onChange?: (value: RoleName, checked: boolean) => void
  onChangeAll?: (checked: boolean) => void
}

function RoleFormControl({ disabled, disabledKeys, value, onChange, onChangeAll }: RoleFormControlProps) {
  const selectedByRole: Record<RoleName, Specialization[]> = useMemo(
    () => ({
      [RoleName.Tank]: value.filter(spec => spec.role === RoleName.Tank),
      [RoleName.Healer]: value.filter(spec => spec.role === RoleName.Healer),
      [RoleName.DamageDealer]: value.filter(spec => spec.role === RoleName.DamageDealer),
    }),
    [value],
  )

  const disabledByRole: Record<RoleName, string[] | undefined> = {
    [RoleName.Tank]: disabledKeys?.filter(key => SPECIALIZATION_BY_KEY[key].role === RoleName.Tank),
    [RoleName.Healer]: disabledKeys?.filter(key => SPECIALIZATION_BY_KEY[key].role === RoleName.Healer),
    [RoleName.DamageDealer]: disabledKeys?.filter(key => SPECIALIZATION_BY_KEY[key].role === RoleName.DamageDealer),
  }

  const allCheckboxRef = useRef<HTMLInputElement>(null)
  const tankCheckboxRef = useRef<HTMLInputElement>(null)
  const healerCheckboxRef = useRef<HTMLInputElement>(null)
  const damageDealerCheckboxRef = useRef<HTMLInputElement>(null)

  const refByRole: Record<RoleName, RefObject<HTMLInputElement | null>> = useMemo(
    () => ({
      [RoleName.Tank]: tankCheckboxRef,
      [RoleName.Healer]: healerCheckboxRef,
      [RoleName.DamageDealer]: damageDealerCheckboxRef,
    }),
    [],
  )

  const handleChangeAll = () => onChangeAll?.(value.length === 0)

  useEffect(() => {
    if (allCheckboxRef.current === null) return
    if (value.length === ALL_SPECIALIZATIONS.length || value.length === 0) {
      allCheckboxRef.current.indeterminate = false
    } else {
      allCheckboxRef.current.indeterminate = true
    }

    Object.entries(selectedByRole).forEach(([role, selected]) => {
      const ref = refByRole[role as RoleName]
      if (ref.current === null) return
      ref.current.indeterminate =
        selected.length !== 0 && selected.length !== SPECIALIZATIONS_BY_ROLE[role as RoleName].length
    })
  }, [value, selectedByRole, refByRole])

  return (
    <div className={`flex w-52 flex-col rounded-tr-lg bg-slate-700`}>
      <Checkbox
        disabled={disabled || disabledKeys?.length === ALL_SPECIALIZATIONS.length}
        ref={allCheckboxRef}
        label='Roles'
        pt={{
          root: { className: 'pb-1' },
          label: { className: '-translate-y-[0.5px] rounded-br-md bg-slate-900 px-1 pr-2' },
          checkmark: { className: '-translate-y-[0.5px] rounded-tr-md rounded-bl-md' },
        }}
        checked={value.length === ALL_SPECIALIZATIONS.length}
        onChange={handleChangeAll}
      />

      <div className='flex flex-1 flex-col gap-1 bg-black/70 px-4 py-1'>
        {Object.values(RoleName).map(role => (
          <Checkbox
            ref={refByRole[role]}
            disabled={disabled || disabledByRole[role]?.length === SPECIALIZATIONS_BY_ROLE[role].length}
            key={role}
            label={role}
            checked={selectedByRole[role].length === SPECIALIZATIONS_BY_ROLE[role].length}
            onChange={() => onChange?.(role, selectedByRole[role].length === 0)}
          />
        ))}
      </div>
    </div>
  )
}
