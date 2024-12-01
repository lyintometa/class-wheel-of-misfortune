import { DetailedHTMLProps, HTMLAttributes, useEffect, useRef, useState } from 'react'
import Checkbox from '../common.tsx/Checkbox'
import { classNames } from '../../util/utils'

interface CheckboxGroupProps<T>
  extends Omit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'defaultChecked' | 'onChange'> {
  checked?: T[]
  defaultChecked?: T[]
  disabled?: boolean
  label?: string
  options: CheckboxGroupOption<T>[]
  pt?: CheckboxGroupPassThroughOptions
  onChange?: (values: T[]) => void
}

export default function CheckBoxGroup<T>({
  checked,
  defaultChecked,
  disabled,
  label,
  options,
  onChange,
  ...props
}: CheckboxGroupProps<T>) {
  const isControlled = useRef<boolean>(checked !== undefined)
  const [controlValue, setControlValue] = useState<T[]>(isControlled.current === true ? [] : (defaultChecked ?? []))
  const groupBoxRef = useRef<HTMLInputElement>(null)

  const internalValue = checked ?? controlValue

  const handleChangeAll = () => {
    const newValue = internalValue.length === 0 ? options.map(option => option.value) : []
    if (isControlled.current === false) setControlValue(newValue)
    onChange?.(newValue)
  }

  const handleChange = (option: CheckboxGroupOption<T>) => {
    const newValue = internalValue.includes(option.value)
      ? internalValue.filter(value => option.value !== value)
      : [...internalValue, option.value]
    if (isControlled.current === false) setControlValue(newValue)
    onChange?.(newValue)
  }

  useEffect(() => {
    if (groupBoxRef.current === null) return
    if (internalValue.length === options.length || internalValue.length === 0) {
      groupBoxRef.current.indeterminate = false
      return
    }

    groupBoxRef.current.indeterminate = true
  }, [internalValue.length, options.length])

  return (
    <div {...props} className={classNames('flex flex-col rounded-tr-lg w-52 bg-slate-700', props.className)}>
      <Checkbox
        ref={groupBoxRef}
        checked={internalValue.length === options.length}
        disabled={disabled || options.every(option => option.disabled)}
        label={label}
        pt={{
          root: { className: 'pb-1' },
          label: { className: 'px-1 pr-2 bg-slate-900 rounded-br-md' },
          checkmark: { className: 'rounded-bl-md rounded-tr-md' }
        }}
        onChange={handleChangeAll}
      />

      <div className='flex flex-col flex-1 bg-black bg-opacity-70 px-4 gap-1 py-1'>
        {options.map(option => (
          <Checkbox
            disabled={disabled || option.disabled}
            key={option.label ?? option.key}
            name={option.name}
            label={option.label}
            checked={internalValue.includes(option.value)}
            onChange={() => handleChange(option)}
          />
        ))}
      </div>
    </div>
  )
}

interface CheckboxGroupOption<T> {
  disabled?: boolean
  label?: string
  key?: string
  name?: string
  value: T
}

interface CheckboxGroupPassThroughOptions {
  root?: Omit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'children'>
}
