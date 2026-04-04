import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react'

import { classNames } from 'util/utils'

import './IconButton.css'

type IconButtonProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

export default function IconButton({ className, ...props }: IconButtonProps) {
  return <button className={classNames('icon-button', className)} type='button' {...props} />
}
