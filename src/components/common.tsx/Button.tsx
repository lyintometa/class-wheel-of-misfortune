import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react'
import './Button.css'

type ButtonProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

export default function Button({ className, ...props }: ButtonProps) {
  return <button type={props.form ? 'submit' : 'button'} className={`button ${className ?? ''}`} {...props} />
}
