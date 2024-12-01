import { ClassName } from './Class'
import { RaceName } from './Race'
import RoleName from './Role'

export default interface Raider {
  name: string
  disabled: {
    specKeys?: string[]
    races?: RaceName[]
  }
  rolls: {
    role?: RoleName
    class?: ClassName
    specKey?: string
    race?: RaceName
    sex?: string
  }
}
