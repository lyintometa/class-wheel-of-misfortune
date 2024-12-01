import { HTMLProps } from 'react'
import './Container.css'

type ContainerProps = HTMLProps<HTMLDivElement>

export default function Container({ className, ...props }: ContainerProps) {
  return <div className={`j-container bg-slate-700 border-2 border-slate-800 ${className}`} {...props} />
}
