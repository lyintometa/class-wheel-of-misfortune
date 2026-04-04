import { DetailedHTMLProps, HTMLAttributes } from 'react'

import './Container.css'

type ContainerProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>

export default function Container({ className, ...props }: ContainerProps) {
  return <div className={`j-container border-2 border-slate-800 bg-slate-700 ${className}`} {...props} />
}
