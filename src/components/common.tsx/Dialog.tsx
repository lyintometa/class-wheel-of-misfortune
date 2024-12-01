import { ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { AiOutlineClose } from 'react-icons/ai'
import './Dialog.css'
import IconButton from './IconButton'
import { classNames } from '../../util/utils'

interface DialogProps {
  children?: ReactNode
  className?: string
  isOpen?: boolean
  title?: string
  onClose?: () => void
}

export default function Dialog({ children, className, isOpen, title, onClose }: DialogProps) {
  if (!isOpen) return null

  return createPortal(
    <div className='dialog'>
      <div className='backdrop' onClick={onClose} />
      {isOpen && (
        <div className={classNames('container', className)}>
          <DialogTitle title={title} onClose={onClose} />
          {children}
        </div>
      )}
    </div>,
    document.getElementById('portal')!
  )
}

interface DialogTitleProps {
  title?: string
  onClose?: () => void
}

function DialogTitle({ title, onClose }: DialogTitleProps) {
  return (
    <div className='dialog-title'>
      <h1>{title}</h1>
      {onClose && (
        <IconButton onClick={() => onClose()}>
          <AiOutlineClose />
        </IconButton>
      )}
    </div>
  )
}

interface DialogContentProps {
  children?: ReactNode
  className?: string
}

export function DialogContent({ children, className }: DialogContentProps) {
  return <div className={classNames('dialog-content', className)}>{children}</div>
}

interface DialogActionsProps {
  children?: ReactNode
}

export function DialogActions({ children }: DialogActionsProps) {
  return <div className='dialog-actions'>{children}</div>
}
