import { FormEvent, useEffect, useRef, useState } from 'react'
import { ALL_CLASSES } from '../../constants/classes'
import Class, { ClassName } from '../../models/Class'
import Checkbox from '../common.tsx/Checkbox'
import Specialization from '../../models/Specialization'
import { BACKGROUND_CLASS_COLOR } from '../../util/colorUtil'
import { ALL_SPECIALIZATIONS, SPECIALIZATIONS_BY_ROLE } from '../../constants/specializations'
import RoleName from '../../models/Role'
import Button from '../common.tsx/Button'

interface SpecializationFormProps {
  defaultCollapsed?: boolean
  defaultValue?: Specialization[]
  disabled?: boolean
  disabledValues?: Specialization[]
  id?: string
  value?: Specialization[]
  onChange?: (value: Specialization[]) => void
  onSubmit?: (value: Specialization[]) => void
}

export default function SpecializationForm({
  defaultCollapsed,
  defaultValue,
  disabled,
  disabledValues,
  id,
  value,
  onChange,
  onSubmit
}: SpecializationFormProps) {
  const isControlled = useRef(value !== undefined)
  const [internalValue, setInternalValue] = useState(defaultValue ?? ALL_SPECIALIZATIONS)
  const valueToUse = disabledValues
    ? (value ?? internalValue).filter(spec => !disabledValues?.includes(spec))
    : (value ?? internalValue)

  if ((isControlled.current && !value) || (!isControlled.current && value)) {
    throw new Error('Cannot switch between uncontrolled and controlled form')
  }

  const handleChange = (specs: Specialization[]) => {
    const exceptDisabled = specs.filter(spec => !disabledValues?.includes(spec))
    onChange?.(exceptDisabled)
    setInternalValue(exceptDisabled)
  }

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
    <div className='flex gap-4'>
      <form className='flex flex-col gap-1 text-slate-800' id={id} onSubmit={handleSubmit}>
        {ALL_CLASSES.map(playableClass => (
          <ClassFormControl
            defaultCollapsed={defaultCollapsed}
            disabled={disabled}
            disabledValues={disabledValues}
            playableClass={playableClass}
            key={playableClass.name}
            onChange={getHandleChange(playableClass.name)}
            value={valueToUse}
          />
        ))}
      </form>
      <div className='flex flex-col gap-2 text-white'>
        <div className='flex justify-between gap-2 items-center'>
          <p>All</p>
          <div className='flex gap-2'>
            <Button
              onClick={() => handleChange(ALL_SPECIALIZATIONS)}
              disabled={disabled || valueToUse.length === ALL_SPECIALIZATIONS.length}
            >
              All
            </Button>
            <Button onClick={() => handleChange([])} disabled={disabled || valueToUse.length === 0}>
              None
            </Button>
          </div>
        </div>
        {Object.values(RoleName).map(role => (
          <div className='flex justify-between gap-2 items-center pl-2' key={role}>
            <p>{role}</p>
            <div className='flex gap-2'>
              <Button
                onClick={() => handleAllRole(role)}
                disabled={
                  disabled ||
                  valueToUse.filter(spec => spec.role === role).length === SPECIALIZATIONS_BY_ROLE[role].length
                }
              >
                All
              </Button>
              <Button
                onClick={() => handleNoRole(role)}
                disabled={disabled || valueToUse.filter(spec => spec.role === role).length === 0}
              >
                None
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

interface ClassFormControlProps {
  defaultCollapsed?: boolean
  disabled?: boolean
  disabledValues?: Specialization[]
  playableClass: Class
  value: Specialization[]
  onChange?: (value: Specialization[]) => void
}

function ClassFormControl({
  defaultCollapsed,
  disabled,
  disabledValues,
  playableClass,
  value,
  onChange
}: ClassFormControlProps) {
  const disabledSpecs = disabledValues?.filter(value => value.className === playableClass.name) ?? []
  const selected = value.filter(value => value.className === playableClass.name)
  const numTotal = playableClass.specializations.length

  const classCheckboxRef = useRef<HTMLInputElement>(null)
  const [isExpanded, setIsExpanded] = useState(
    !defaultCollapsed && selected.length !== numTotal && selected.length !== 0
  )
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
    <div className={`flex flex-col rounded-tr-lg w-56 ${BACKGROUND_CLASS_COLOR[playableClass.name]}`}>
      <Checkbox
        disabled={disabled || disabledSpecs.length === numTotal}
        ref={classCheckboxRef}
        label={playableClass.name}
        pt={{
          root: {
            className: 'pb-1',
            onClick: () => setIsExpanded(prev => !prev)
          },
          label: {
            className: 'px-1 pr-2 bg-slate-900 rounded-br-md',
            style: {
              color: 'var(--color-text)',
              transform: 'translate(0, -1px)'
            }
          },
          checkmark: { className: 'rounded-bl-md rounded-tr-md' }
        }}
        onClick={e => e.stopPropagation()}
        checked={selected.length === numTotal}
        onChange={handleChangeAll}
      />

      {isExpanded && (
        <div className='flex flex-col  bg-black bg-opacity-70 px-4 gap-1 py-1'>
          {playableClass.specializations.map(spec => (
            <Checkbox
              disabled={disabled || disabledSpecs.includes(spec)}
              key={spec.name}
              label={spec.name}
              pt={{
                label: {
                  style: {
                    color: 'var(--color-text)'
                  }
                }
              }}
              checked={selected.includes(spec)}
              onChange={() => handleChange(spec)}
            />
          ))}
        </div>
      )}
    </div>
  )
}
