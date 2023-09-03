import { inject } from '@loopback/core'
import { post, api, requestBody, get } from '@loopback/rest'
import { UserService } from '../services/user.service'
import { USERS_SERVICE } from '../keys'
import { User } from '../../../entities'

@api({ basePath: '/users' })
export class UsersController {
  constructor(
    @inject(USERS_SERVICE)
    public userService: UserService,
  ) {}

  @post('/')
  createUser(@requestBody() user: User): Promise<User> {
    return this.userService.createUser(user)
  }

  @get('/')
  getUsers(): Promise<User[]> {
    return this.userService.getUsers()
  }
}
