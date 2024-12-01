import Dialog, { DialogActions, DialogContent } from '../common.tsx/Dialog'
import Button from '../common.tsx/Button'
import { useRef, useState } from 'react'
import Checkbox from '../common.tsx/Checkbox'

interface InviteRaiderDialogProps {
  isOpen?: boolean
  names?: string[]
  onClose?: () => void
  onSubmit: (name: string) => void
}

export default function InviteRaiderDialog({ isOpen, names, onClose, onSubmit }: InviteRaiderDialogProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [name, setName] = useState('')
  const [keepOpen, setKeepOpen] = useState(false)

  const handleSubmit = () => {
    onSubmit(name)
    setName('')
    inputRef.current?.focus()
    if (keepOpen) return
    onClose?.()
  }

  return (
    <Dialog isOpen={isOpen} title='Invite' onClose={onClose} className='w-96'>
      <DialogContent>
        <div className='flex gap-4 content-center pt-2'>
          <p className='pt-0.5'>Name</p>
          <input
            ref={inputRef}
            className='text-black p-1 rounded'
            value={name}
            onChange={e => setName(e.target.value)}
            autoFocus
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Checkbox checked={keepOpen} onChange={() => setKeepOpen(prev => !prev)} />
        <Button onClick={handleSubmit} disabled={names?.includes(name)}>
          Invite
        </Button>
      </DialogActions>
    </Dialog>
  )
}
