import { FormEvent, RefObject, useEffect, useMemo, useRef, useState } from 'react'
import { ALL_CLASSES } from '../../constants/classes'
import Class, { ClassName } from '../../models/Class'
import Checkbox from '../common.tsx/Checkbox'
import Specialization from '../../models/Specialization'
import { BACKGROUND_CLASS_COLOR } from '../../util/colorUtil'
import { ALL_SPECIALIZATIONS, SPECIALIZATIONS_BY_ROLE, SPECIALIZATION_BY_KEY } from '../../constants/specializations'
import RoleName from '../../models/Role'
import { classNames, getKey } from '../../util/utils'

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
  onSubmit
}: SpecializationFormProps) {
  const isControlled = useRef(value !== undefined)
  const [internalValue, setInternalValue] = useState(defaultValue ?? ALL_SPECIALIZATIONS)

  const valueToUse = disabledKeys
    ? (value ?? internalValue).filter(spec => !disabledKeys?.includes(getKey(spec)))
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
    <form className='flex gap-2 flex-wrap justify-center text-slate-800' id={id} onSubmit={handleSubmit}>
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
  const numTotal = playableClass.specializations.length

  const classCheckboxRef = useRef<HTMLInputElement>(null)

  const classSpecializations = playableClass.specializations

  const handleChangeAll = () => {
    onChange?.(selected.length === 0 ? classSpecializations : [])
  }

  const handleChange = (spec: Specialization) => {
    onChange?.(selected.includes(spec) ? selected.filter(select => select !== spec) : [...selected, spec])
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
    <div className={`flex flex-col rounded-tr-lg w-52 ${BACKGROUND_CLASS_COLOR[playableClass.name]}`}>
      <Checkbox
        disabled={disabled || disabledSpecs.length === numTotal}
        ref={classCheckboxRef}
        label={playableClass.name}
        pt={{
          root: { className: 'pb-1' },
          label: {
            className: 'px-1 pr-2 bg-slate-900 text-slate-200 rounded-br-md',
            style: {
              transform: 'translate(0, -1px)'
            }
          },
          checkmark: { className: 'rounded-bl-md rounded-tr-md mt-[-1px] h-[26px]' }
        }}
        checked={selected.length === numTotal}
        onChange={handleChangeAll}
      />

      <div className='flex flex-col flex-1 bg-black bg-opacity-70 px-4 gap-1 py-1'>
        {playableClass.specializations.map(spec => (
          <Checkbox
            disabled={disabled || disabledSpecs.includes(getKey(spec))}
            key={spec.name}
            label={
              spec.className === ClassName.Warrior && spec.name === 'Fury' && !selected.includes(spec)
                ? 'Brand soll mal was anderes spielen'
                : spec.className === ClassName.Hunter && spec.name === 'Beast Mastery' && !selected.includes(spec)
                  ? 'Maxi kann halt sonst nix'
                  : spec.name
            }
            pt={{
              label: {
                className: classNames('text-slate-200', {
                  'text-[9px] pt-1':
                    (spec.className === ClassName.Warrior && spec.name === 'Fury' && !selected.includes(spec)) ||
                    (spec.className === ClassName.Hunter && spec.name === 'Beast Mastery' && !selected.includes(spec))
                })
              }
            }}
            checked={selected.includes(spec)}
            onChange={() => handleChange(spec)}
          />
        ))}
      </div>
    </div>
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
      [RoleName.DamageDealer]: value.filter(spec => spec.role === RoleName.DamageDealer)
    }),
    [value]
  )

  const disabledByRole: Record<RoleName, string[] | undefined> = {
    [RoleName.Tank]: disabledKeys?.filter(key => SPECIALIZATION_BY_KEY[key].role === RoleName.Tank),
    [RoleName.Healer]: disabledKeys?.filter(key => SPECIALIZATION_BY_KEY[key].role === RoleName.Healer),
    [RoleName.DamageDealer]: disabledKeys?.filter(key => SPECIALIZATION_BY_KEY[key].role === RoleName.DamageDealer)
  }

  const allCheckboxRef = useRef<HTMLInputElement>(null)
  const tankCheckboxRef = useRef<HTMLInputElement>(null)
  const healerCheckboxRef = useRef<HTMLInputElement>(null)
  const damageDealerCheckboxRef = useRef<HTMLInputElement>(null)

  const refByRole: Record<RoleName, RefObject<HTMLInputElement>> = useMemo(
    () => ({
      [RoleName.Tank]: tankCheckboxRef,
      [RoleName.Healer]: healerCheckboxRef,
      [RoleName.DamageDealer]: damageDealerCheckboxRef
    }),
    []
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
      if (selected.length === SPECIALIZATIONS_BY_ROLE[role as RoleName].length || selected.length === 0) {
        ref.current.indeterminate = false
      } else {
        ref.current.indeterminate = true
      }
    })
  }, [value, selectedByRole, refByRole])

  return (
    <div className={`flex flex-col rounded-tr-lg w-52 bg-slate-700`}>
      <Checkbox
        disabled={disabled || disabledKeys?.length === ALL_SPECIALIZATIONS.length}
        ref={allCheckboxRef}
        label='Roles'
        pt={{
          root: { className: 'pb-1' },
          label: {
            className: 'px-1 pr-2 bg-slate-900 rounded-br-md',
            style: { transform: 'translate(0, -1px)' }
          },
          checkmark: { className: 'rounded-bl-md rounded-tr-md mt-[-1px] h-[26px]' }
        }}
        checked={value.length === ALL_SPECIALIZATIONS.length}
        onChange={handleChangeAll}
      />

      <div className='flex flex-col flex-1 bg-black bg-opacity-70 px-4 gap-1 py-1'>
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
