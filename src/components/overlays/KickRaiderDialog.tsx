import Dialog, { DialogActions, DialogContent } from '../common.tsx/Dialog'
import Button from '../common.tsx/Button'

interface KickRaiderDialogProps {
  raiderName: string
  isOpen?: boolean
  onClose?: () => void
  onSubmit: () => void
}

export default function KickRaiderDialog({ raiderName, isOpen, onClose, onSubmit }: KickRaiderDialogProps) {
  const handleSubmit = () => {
    onSubmit()
    onClose?.()
  }

  return (
    <Dialog isOpen={isOpen} title={`Kick ${raiderName}`} onClose={onClose} className='w-96'>
      <DialogContent>
        <span>Do you really want to kick </span>
        <span className='font-bold'>{raiderName}</span>
        <span> for his low DPS?</span>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSubmit}>Kick</Button>
        <Button onClick={() => onClose?.()}>Give Him One More Chance</Button>
      </DialogActions>
    </Dialog>
  )
}
