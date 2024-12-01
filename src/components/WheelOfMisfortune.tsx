import { Key, useEffect, useMemo, useRef, useState } from 'react'
import { getShuffled } from '../util/arrayUtils'
import './WheelOfMisfortune.css'
import { getRandomFunNumber, getRandomInteger } from '../util/numberUtil'
import Button from './common.tsx/Button'

export interface WheelOfMisfortuneOption<T> {
  label?: string
  value: T
  key: Key
  className?: string
}

const SPIN_DELAY = 500
const SPIN_DURATION = 10000
const FUN_FACTOR = 2

interface WheelOfMisfortuneProps<T> {
  options: WheelOfMisfortuneOption<T>[]
  disableShuffle?: boolean
  onChange?: (value: T) => void
  onSpinStart?: () => void
}

export default function WheelOfMisfortune<T>({
  options,
  disableShuffle,
  onChange,
  onSpinStart
}: WheelOfMisfortuneProps<T>) {
  const [isClicked, setIsClicked] = useState(false)
  const [showIndicator, setShowIndicator] = useState(false)
  const [value, setValue] = useState<WheelOfMisfortuneOption<T>>()

  const discRef = useRef<HTMLDivElement>(null)
  const animation = useRef<Animation>()
  const rotation = useRef(0)

  useEffect(() => {
    setIsClicked(false)
    setShowIndicator(false)
    setValue(undefined)
  }, [options])

  const shuffled = useMemo(() => (disableShuffle ? options : getShuffled(options)), [disableShuffle, options])

  const isSpinning = isClicked && value === undefined
  const numOptions = shuffled.length
  const degreePerSegment = 360 / numOptions

  const handleClick = () => {
    onSpinStart?.()
    setIsClicked(true)
    setValue(undefined)
    setTimeout(() => setShowIndicator(true), SPIN_DELAY + 1000)

    const resultIndex = getRandomInteger(numOptions)
    const result = shuffled[resultIndex]

    const offset = getRandomFunNumber(degreePerSegment, FUN_FACTOR) - degreePerSegment / 2
    const extraRotation = (10 + getRandomInteger(2)) * 360

    const rotationCurrentRel = rotation.current % 360
    const rotationTargetRel = (360 - resultIndex * degreePerSegment + offset) % 360

    const rotationMin = (Math.floor(rotation.current / 360) + (rotationCurrentRel > rotationTargetRel ? 0 : 1)) * 360

    const rotationTarget = rotationMin + rotationTargetRel + extraRotation

    animation.current?.cancel()

    discRef.current?.animate(
      [{ transform: `rotate(${rotation.current}deg)` }, { transform: `rotate(${rotationTarget}deg)` }],
      {
        delay: SPIN_DELAY,
        duration: SPIN_DURATION,
        easing: 'cubic-bezier(.15,-0.2,0,1)',
        fill: 'forwards'
      }
    )

    rotation.current = rotationTarget

    setTimeout(() => {
      setValue(result)
      onChange?.(result.value)
    }, SPIN_DELAY + SPIN_DURATION)
  }

  if (options.length < 2 || options.every(option => option.value === options[0].value)) {
    return (
      <div className='wheel-of-misfortune'>
        <p className='error-msg'>Select at least 2 options to roll</p>
        {(options.length === 1 ||
          (options.length > 1 && options.every(option => option.value === options[0].value))) && (
          <Button
            className='absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-1/2'
            onClick={() => {
              setValue(options[0])
              onChange?.(options[0].value)
            }}
          >
            Set {options[0].label}
          </Button>
        )}
      </div>
    )
  }

  return (
    <div className='wheel-of-misfortune'>
      <div className='disc' ref={discRef}>
        {(isClicked ? shuffled : options).map((option, i) => (
          <div
            className={`segment ${option.className}`}
            key={option.key}
            style={{
              opacity: value && option.key !== value.key ? 0.3 : 1,
              rotate: `${degreePerSegment * i + 90}deg`,
              height: numOptions > 2 ? `calc(2*50cqi*tan(180deg/${numOptions}) - 1px)` : '100cqi',
              clipPath: numOptions > 2 ? 'polygon(0% 0%, 99.9% 50%, 0% 100%)' : undefined,
              fontSize: `${1.9 / Math.sqrt(numOptions) + 2}cqi`
            }}
          >
            <label>{option.label}</label>
          </div>
        ))}
      </div>
      {showIndicator && (
        <>
          <div className='indicator top' />
          <div className='indicator middle' />
        </>
      )}
      <button
        type='button'
        className='spin-button text-white bg-slate-800 disabled:bg-slate-800  hover:bg-slate-700 active:bg-slate-900'
        onClick={handleClick}
        disabled={isSpinning}
      >
        {!isSpinning ? (value ? 'Reroll' : 'Spin') : ''}
      </button>
    </div>
  )
}
