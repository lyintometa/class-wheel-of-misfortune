import { FormEvent } from 'react'
import RoleName from '../../models/Role'
import { RoleContextValue } from '../../contexts/RoleContext'

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
      numHeals: parseInt(target[RoleName.Healer].value)
    })
  }

  return (
    <form id={id} onSubmit={handleSubmit} className='flex flex-col gap-2'>
      <label className='flex gap-2 items-center justify-between'>
        <p>Tanks</p>
        <input
          type='number'
          defaultValue={defaultValue?.numTanks}
          name={RoleName.Tank}
          className='bg-slate-700 text-right px-3 py-1'
        />
      </label>
      <label className='flex gap-2 items-center justify-between'>
        <p>Healers</p>
        <input
          type='number'
          defaultValue={defaultValue?.numHeals}
          name={RoleName.Healer}
          className='bg-slate-700 text-right px-3 py-1'
        />
      </label>
    </form>
  )
}
