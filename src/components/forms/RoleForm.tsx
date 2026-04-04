import { FormEvent } from 'react'

import { RoleContextValue } from '../../contexts/RoleContext'
import RoleName from '../../models/Role'

interface RoleFormProps {
  id?: string
  defaultValue?: RoleContextValue
  onSubmit?: (value: RoleContextValue) => void
}

export default function RoleForm({ defaultValue, id, onSubmit }: RoleFormProps) {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const target = e.target as typeof e.target & {
      [RoleName.Tank]: { value: string }
      [RoleName.Healer]: { value: string }
    }

    onSubmit?.({
      numTanks: parseInt(target[RoleName.Tank].value),
      numHeals: parseInt(target[RoleName.Healer].value),
    })
  }

  return (
    <form id={id} onSubmit={handleSubmit} className='flex flex-col gap-2'>
      <label className='flex items-center justify-between gap-2'>
        <p>Tanks</p>
        <input
          type='number'
          defaultValue={defaultValue?.numTanks}
          name={RoleName.Tank}
          className='bg-slate-700 px-3 py-1 text-right'
        />
      </label>
      <label className='flex items-center justify-between gap-2'>
        <p>Healers</p>
        <input
          type='number'
          defaultValue={defaultValue?.numHeals}
          name={RoleName.Healer}
          className='bg-slate-700 px-3 py-1 text-right'
        />
      </label>
    </form>
  )
}
