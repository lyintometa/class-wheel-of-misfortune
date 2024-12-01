import { ClassName } from './Class'
import RoleName from './Role'
import Specialization from './Specialization'

export default interface Vetos {
  roles: RoleName[]
  classes: ClassName[]
  specializations: Specialization[]
}
