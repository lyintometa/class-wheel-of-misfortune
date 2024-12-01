import Dialog, { DialogActions, DialogContent } from '../common.tsx/Dialog'
import Button from '../common.tsx/Button'
import { ReactNode } from 'react'

interface ConfirmDialogProps {
  buttonLabelSubmit?: ReactNode
  buttonLabelCancel?: ReactNode
  children?: ReactNode
  isOpen?: boolean
  title?: string
  onClose?: () => void
  onSubmit?: () => void
}

export default function ConfirmDialog({
  buttonLabelSubmit,
  buttonLabelCancel,
  children,
  isOpen,
  title,
  onClose,
  onSubmit
}: ConfirmDialogProps) {
  const handleSubmit = () => {
    onSubmit?.()
    onClose?.()
  }

  return (
    <Dialog isOpen={isOpen} title={title} onClose={onClose} className='w-96'>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button onClick={handleSubmit}>{buttonLabelSubmit ?? 'Confirm'}</Button>
        <Button onClick={() => onClose?.()}>{buttonLabelCancel ?? 'Cancel'}</Button>
      </DialogActions>
    </Dialog>
  )
}
