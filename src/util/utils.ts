import Specialization from '../models/Specialization'

export const getKey = (specialization: Specialization): string => specialization.className + specialization.name

export const classNames = (...args: unknown[]): string => {
  let className = ''

  args.forEach(arg => {
    switch (typeof arg) {
      case 'string':
        if (arg.length === 0) return
        className += ` ${arg}`
        return

      case 'object':
        if (Array.isArray(arg)) throw new Error('Array not supported')
        if (arg === null) return

        Object.entries(arg).forEach(([key, value]) => {
          if (!value) return
          className += ` ${key}`
        })
        return

      case 'undefined':
        return

      default:
        throw new Error(typeof arg + ' not supported')
    }
  })

  return className
}
