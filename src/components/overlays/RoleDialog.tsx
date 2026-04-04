import { useContext, useId } from 'react'

import { RoleContext, RoleContextValue } from '../../contexts/RoleContext'
import { SetRoleContext } from '../../contexts/SetRoleContext'
import Button from '../common/Button'
import Dialog, { DialogActions, DialogContent } from '../common/Dialog'
import RoleForm from '../forms/RoleForm'

interface RoleDialogProps {
  isOpen?: boolean
  onClose?: () => void
}

export default function RoleDialog({ isOpen, onClose }: RoleDialogProps) {
  const roles = useContext(RoleContext)
  const setRoles = useContext(SetRoleContext)
  const id = useId()

  const handleSubmit = (roles: RoleContextValue) => {
    setRoles(roles)
    onClose?.()
  }

  return (
    <Dialog isOpen={isOpen} title='Select Raid Composition' onClose={onClose} className='w-96'>
      <DialogContent>
        <RoleForm id={id} defaultValue={roles} onSubmit={handleSubmit} />
      </DialogContent>
      <DialogActions>
        <Button form={id}>Submit</Button>
        <Button onClick={() => onClose?.()}>Cancel</Button>
      </DialogActions>
    </Dialog>
  )
}
