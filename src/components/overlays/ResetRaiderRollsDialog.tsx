import Dialog, { DialogActions, DialogContent } from '../common.tsx/Dialog'
import Button from '../common.tsx/Button'
import Raider from '../../models/Raider'
import Checkbox from '../common.tsx/Checkbox'
import { ChangeEvent, useState } from 'react'

interface ResetRaiderDialogProps {
  raider: Raider
  isOpen?: boolean
  onClose?: () => void
  onSubmit: (raider: Raider) => void
}

export default function ResetRaiderDialog({ raider, isOpen, onClose, onSubmit }: ResetRaiderDialogProps) {
  const [checked, setChecked] = useState<Record<string, boolean>>({
    role: false,
    class: false,
    spec: false,
    race: false,
    sex: false
  })

  const handleSubmit = () => {
    const newRaider = { ...raider, rolls: { ...raider.rolls } }

    if (checked.sex) delete newRaider.rolls.sex
    if (checked.race || checked.class || checked.role) delete newRaider.rolls.race
    if (checked.spec || checked.class || checked.role) delete newRaider.rolls.specKey
    if (checked.class || checked.role) delete newRaider.rolls.class
    if (checked.role) delete newRaider.rolls.role

    onSubmit(newRaider)
    onClose?.()
  }

  const getOnClick = (key: string) => (e: ChangeEvent<HTMLInputElement>) => {
    setChecked(prev => ({ ...prev, [key]: e.target.checked }))
  }

  return (
    <Dialog isOpen={isOpen} title={`Edit ${raider.name}`} onClose={onClose} className='w-96'>
      <DialogContent className='flex flex-col gap-4'>
        <p>Check the rolls to reset</p>
        <div className='flex flex-col bg-slate-950 gap-2 p-2'>
          <Checkbox label='Role' checked={checked.role} onChange={getOnClick('role')} />
          <Checkbox
            label='Class'
            checked={checked.class || checked.role}
            disabled={checked.role}
            onChange={getOnClick('class')}
          />
          <Checkbox
            label='Spec'
            checked={checked.spec || checked.class || checked.role}
            disabled={checked.class || checked.role}
            onChange={getOnClick('spec')}
          />
          <Checkbox
            label='Race'
            checked={checked.race || checked.class || checked.role}
            disabled={checked.class || checked.role}
            onChange={getOnClick('race')}
          />
          <Checkbox label='Sex' checked={checked.sex} onChange={getOnClick('sex')} />
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSubmit}>Reset</Button>
        <Button onClick={() => onClose?.()}>Cancel</Button>
      </DialogActions>
    </Dialog>
  )
}
