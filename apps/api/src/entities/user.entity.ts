import { Column, Entity } from '@loopback/typeorm'
import { Base } from './base'

@Entity()
export class User extends Base {
  @Column()
  name: string
}
