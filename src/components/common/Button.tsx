import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react'

import { classNames } from 'util/utils'

import './Button.css'

type ButtonProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

export default function Button({ className, ...props }: ButtonProps) {
  return <button className={classNames('button', className)} type={props.form ? 'submit' : 'button'} {...props} />
}
