import { DetailedHTMLProps, HTMLAttributes } from 'react'
import './IconButton.css'

type IconButtonProps = DetailedHTMLProps<HTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

export default function IconButton({ className, ...props }: IconButtonProps) {
  return <button type='button' className={`icon-button ${className}`} {...props} />
}
