import { useContext, useId, useMemo } from 'react'
import Dialog, { DialogActions, DialogContent } from '../common.tsx/Dialog'
import SpecializationForm from '../forms/SpecializationForm3'
import Button from '../common.tsx/Button'
import Specialization from '../../models/Specialization'
import { SetDisabledSpecializationsContext } from '../../contexts/SetDisabledSpecializationsContext'
import { ALL_SPECIALIZATION_KEYS, ALL_SPECIALIZATIONS } from '../../constants/specializations'
import { getKey } from '../../util/utils'
import { useDisabledSpecializationKeys } from '../../hooks/useDisabledSpecializationKeys'

interface SpecializationDialogProps {
  isOpen?: boolean
  onClose?: () => void
}

export default function SpecializationDialog({ isOpen, onClose }: SpecializationDialogProps) {
  const disabledKeys = useDisabledSpecializationKeys()
  const setDisabledSpecs = useContext(SetDisabledSpecializationsContext)
  const id = useId()

  const enabledSpecs = useMemo(
    () => ALL_SPECIALIZATIONS.filter(spec => !disabledKeys.includes(getKey(spec))),
    [disabledKeys]
  )

  const handleSubmit = (specs: Specialization[]) => {
    const enabledKeys = specs.map(getKey)
    setDisabledSpecs(ALL_SPECIALIZATION_KEYS.filter(key => !enabledKeys.includes(key)))
    onClose?.()
  }

  return (
    <Dialog isOpen={isOpen} title='Select Available Specs' onClose={onClose}>
      <DialogContent>
        <SpecializationForm id={id} defaultValue={enabledSpecs} onSubmit={handleSubmit} />
      </DialogContent>
      <DialogActions>
        <Button form={id}>Submit</Button>
        <Button onClick={() => onClose?.()}>Cancel</Button>
      </DialogActions>
    </Dialog>
  )
}
