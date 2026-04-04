import { useContext, useId, useMemo } from 'react'

import { ALL_SPECIALIZATION_KEYS, ALL_SPECIALIZATIONS } from '../../constants/specializations'
import { SetDisabledSpecializationsContext } from '../../contexts/SetDisabledSpecializationsContext'
import { useDisabledSpecializationKeys } from '../../hooks/useDisabledSpecializationKeys'
import Specialization from '../../models/Specialization'
import { getKey } from '../../util/utils'
import Button from '../common/Button'
import Dialog, { DialogActions, DialogContent } from '../common/Dialog'
import SpecializationForm from '../forms/SpecializationForm3'

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
    [disabledKeys],
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
