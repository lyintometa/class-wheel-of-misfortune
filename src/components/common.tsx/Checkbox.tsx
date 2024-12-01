import { DetailedHTMLProps, forwardRef, HTMLAttributes, useId } from 'react'
import './Checkbox.css'
import { classNames } from '../../util/utils'

interface CheckboxProps extends Omit<DetailedHTMLProps<HTMLAttributes<HTMLInputElement>, HTMLInputElement>, 'type'> {
  checked?: boolean
  disabled?: boolean
  label?: string
  name?: string
  pt?: CheckboxPassThrougProps
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(({ label, name, pt: passThroughProps, ...props }, ref) => {
  const id = useId()
  const { className: rootClassName, ...rootProps } = passThroughProps?.root ?? {}
  const { className: checkMarkClassName, ...checkMarkProps } = passThroughProps?.checkmark ?? {}

  return (
    <div className={classNames('checkbox-container', rootClassName)} {...rootProps}>
      {label && (
        <label htmlFor={id} {...passThroughProps?.label}>
          {label}
        </label>
      )}
      <div className='input-container'>
        <input name={name} id={id} ref={ref} type='checkbox' {...props} />
        <span className={classNames('checkmark', checkMarkClassName)} {...checkMarkProps}></span>
      </div>
    </div>
  )
})

Checkbox.displayName = 'Checkbox'

export default Checkbox

interface CheckboxPassThrougProps {
  label?: Omit<DetailedHTMLProps<HTMLAttributes<HTMLLabelElement>, HTMLLabelElement>, 'children' | 'htmlFor'>
  root?: Omit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'children'>
  checkmark?: Omit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'children'>
}
