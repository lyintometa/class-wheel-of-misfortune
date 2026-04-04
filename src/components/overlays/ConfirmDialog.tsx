import { ReactNode } from 'react'

import Button from '../common/Button'
import Dialog, { DialogActions, DialogContent } from '../common/Dialog'

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
  onSubmit,
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
