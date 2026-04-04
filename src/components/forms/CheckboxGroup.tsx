import { DetailedHTMLProps, HTMLAttributes, useEffect, useRef, useState } from 'react'

import Checkbox from 'components/common/Checkbox'
import { classNames } from 'util/utils'

export interface CheckboxGroupOption<T> {
  disabled?: boolean
  label?: string
  key?: string
  value: T
}

export interface CheckboxGroupProps<T> extends Omit<
  DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
  'defaultChecked' | 'onChange'
> {
  checked?: T[]
  defaultChecked?: T[]
  disabled?: boolean
  label?: string
  options: CheckboxGroupOption<T>[]
  onChange?: (values: T[]) => void
}

export default function CheckBoxGroup<T>({
  checked,
  className,
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
    const newValue =
      internalValue.includes(option.value) ?
        internalValue.filter(value => option.value !== value)
      : [...internalValue, option.value]
    if (isControlled.current === false) setControlValue(newValue)
    onChange?.(newValue)
  }

  useEffect(() => {
    if (groupBoxRef.current === null) return
    groupBoxRef.current.indeterminate = internalValue.length !== 0 && internalValue.length !== options.length
  }, [internalValue.length, options.length])

  return (
    <div className={classNames('flex w-52 flex-col rounded-tr-lg', className)} {...props}>
      <Checkbox
        ref={groupBoxRef}
        checked={internalValue.length === options.length}
        disabled={disabled || options.every(option => option.disabled)}
        label={label}
        pt={{
          root: { className: 'pb-1' },
          label: { className: '-translate-y-[0.5px] rounded-br-md bg-slate-900 px-1 pr-2' },
          checkmark: { className: '-translate-y-[0.5px] rounded-tr-md rounded-bl-md' },
        }}
        onChange={handleChangeAll}
      />

      <div className='flex flex-1 flex-col gap-1 bg-black/70 px-4 py-1'>
        {options.map(option => (
          <Checkbox
            disabled={disabled || option.disabled}
            key={option.key ?? option.label}
            label={option.label}
            checked={internalValue.includes(option.value)}
            onChange={() => handleChange(option)}
          />
        ))}
      </div>
    </div>
  )
}
