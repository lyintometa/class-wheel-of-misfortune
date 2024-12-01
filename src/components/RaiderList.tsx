import Raider from '../models/Raider'
import IconButton from './common.tsx/IconButton'
import { AiOutlinePlus } from 'react-icons/ai'
import './RaiderList.css'
import { classNames } from '../util/utils'
import { useState } from 'react'
import KickRaiderDialog from './overlays/KickRaiderDialog'
import { AiOutlineClose } from 'react-icons/ai'
import InviteRaiderDialog from './overlays/InviteRaiderDialog'
import { AiOutlineUp } from 'react-icons/ai'
import { AiOutlineDown } from 'react-icons/ai'
import { SPECIALIZATION_BY_KEY } from '../constants/specializations'
import ResetRaiderDialog from './overlays/ResetRaiderRollsDialog'
import { AiFillEdit } from 'react-icons/ai'
import { AiOutlineRetweet } from 'react-icons/ai'
import ConfirmDialog from './overlays/ConfirmDialog'

interface RaiderListProps {
  raiders: Raider[]
  selected?: Raider
  onChange?: (name: string, raider: Raider) => void
  onInvite: (newName: string) => void
  onKick: (name: string) => void
  onMove: (name: string, direction: boolean) => void
  onSelect?: (name: string) => void
  onShuffle?: () => void
}

export default function RaiderList({
  raiders,
  selected,
  onChange,
  onInvite,
  onMove,
  onKick,
  onSelect,
  onShuffle
}: RaiderListProps) {
  const [inviteOpen, setInviteOpen] = useState(false)
  const [confirmShuffleOpen, setConfirmShuffleOpen] = useState(false)

  return (
    <>
      <table className='bg-white min-w-[650px]'>
        <thead>
          <tr>
            <th className='w-40'>{raiders.length}</th>
            <th className='w-30'>Role</th>
            <th className='w-30'>Class</th>
            <th className='w-30'>Spec</th>
            <th className='w-30'>Race</th>
            <th className='w-30'>Sex</th>
            <th className='text-end'>
              <IconButton onClick={() => setConfirmShuffleOpen(true)}>
                <AiOutlineRetweet />
              </IconButton>
            </th>
          </tr>
        </thead>
        <tbody>
          {raiders.map(raider => (
            <RaiderRow
              raider={raider}
              key={raider.name}
              isSelected={raider === selected}
              onChange={raider => onChange?.(raider.name, raider)}
              onMove={direction => onMove(raider.name, direction)}
              onSelect={() => onSelect?.(raider.name)}
              onKick={() => onKick(raider.name)}
            />
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={7} className='text-right'>
              <IconButton onClick={() => setInviteOpen(true)}>
                <AiOutlinePlus />
              </IconButton>
            </td>
          </tr>
          <InviteRaiderDialog
            isOpen={inviteOpen}
            names={raiders.map(raider => raider.name)}
            onSubmit={onInvite}
            onClose={() => setInviteOpen(false)}
          />
        </tfoot>
      </table>
      <ConfirmDialog
        buttonLabelSubmit='Shuffle'
        isOpen={confirmShuffleOpen}
        title='Shuffle Raiders'
        onSubmit={onShuffle}
        onClose={() => setConfirmShuffleOpen(false)}
      >
        Are you sure you want to shuffle all raiders, this cannot be undone.
      </ConfirmDialog>
    </>
  )
}

interface RaiderRowProps {
  raider: Raider
  isSelected?: boolean
  onChange: (raider: Raider) => void
  onKick: () => void
  onMove?: (direction: boolean) => void
  onSelect?: () => void
}

function RaiderRow({ raider, isSelected, onChange, onKick, onMove, onSelect }: RaiderRowProps) {
  const [editOpen, setEditOpen] = useState(false)
  const [kickOpen, setKickOpen] = useState(false)

  const handleEdit = (raider: Raider) => {
    onChange(raider)
    setEditOpen(false)
  }

  const handleKick = () => {
    onKick()
    setKickOpen(false)
  }

  const spec = raider.rolls.specKey ? SPECIALIZATION_BY_KEY[raider.rolls.specKey] : undefined

  return (
    <>
      <tr key={raider.name} className={classNames({ selected: isSelected })} onClick={onSelect}>
        <td>{raider.name}</td>
        <td className={classNames('text-center', { 'italic text-slate-400': raider.rolls.role === undefined })}>
          {raider.rolls.role ?? spec?.role}
        </td>
        <td className={classNames('text-center', { 'italic text-slate-400': raider.rolls.class === undefined })}>
          {raider.rolls.class ?? spec?.className}
        </td>
        <td className='text-center'>{spec?.name}</td>
        <td className='text-center'>{raider.rolls.race}</td>
        <td className='text-center'>{raider.rolls.sex}</td>
        <td className='flex justify-end'>
          <IconButton onClick={() => onMove?.(true)}>
            <AiOutlineDown />
          </IconButton>
          <IconButton onClick={() => onMove?.(false)}>
            <AiOutlineUp />
          </IconButton>
          <IconButton onClick={() => setEditOpen(true)}>
            <AiFillEdit />
          </IconButton>
          <IconButton onClick={() => setKickOpen(true)}>
            <AiOutlineClose className='hover:text-red-400' />
          </IconButton>
        </td>
      </tr>
      <KickRaiderDialog
        isOpen={kickOpen}
        onSubmit={handleKick}
        raiderName={raider.name}
        onClose={() => setKickOpen(false)}
      />
      <ResetRaiderDialog isOpen={editOpen} onSubmit={handleEdit} raider={raider} onClose={() => setEditOpen(false)} />
    </>
  )
}
