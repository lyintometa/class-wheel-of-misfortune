import { useRef, useState } from 'react'

import Button from '../common/Button'
import Checkbox from '../common/Checkbox'
import Dialog, { DialogActions, DialogContent } from '../common/Dialog'

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
        <div className='flex content-center gap-4 pt-2'>
          <p className='pt-0.5'>Name</p>
          <input
            ref={inputRef}
            className='rounded p-1 text-black'
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
