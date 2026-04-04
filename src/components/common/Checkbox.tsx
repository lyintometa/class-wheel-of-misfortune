import { DetailedHTMLProps, HTMLAttributes, InputHTMLAttributes, useId } from 'react'

import { classNames } from 'util/utils'

import './Checkbox.css'

interface CheckboxProps extends Omit<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  'type'
> {
  label?: string
  pt?: CheckboxPassThrougProps
}

export default function Checkbox({ label, pt, ...props }: CheckboxProps) {
  const id = useId()
  const { className: rootClassName, ...rootProps } = pt?.root ?? {}
  const { className: checkMarkClassName, ...checkMarkProps } = pt?.checkmark ?? {}

  return (
    <div className={classNames('checkbox-container', rootClassName)} {...rootProps}>
      {label && (
        <label htmlFor={props.id ?? id} {...pt?.label}>
          {label}
        </label>
      )}
      <div className='input-container'>
        <input id={props.id ?? id} type='checkbox' {...props} />
        <span className={classNames('checkmark', checkMarkClassName)} {...checkMarkProps}></span>
      </div>
    </div>
  )
}

interface CheckboxPassThrougProps {
  label?: Omit<DetailedHTMLProps<HTMLAttributes<HTMLLabelElement>, HTMLLabelElement>, 'children' | 'htmlFor'>
  root?: Omit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'children'>
  checkmark?: Omit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'children'>
}
