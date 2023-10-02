import { Repository, typeorm } from '@loopback/typeorm'
import { User } from '../../../entities'

export class UserService {
  constructor(
    @typeorm.repository(User)
    private userRepository: Repository<User>,
  ) {}
  async createUser(user: User) {
    return this.userRepository.save(user)
  }

  async getUsers() {
    return this.userRepository.find()
  }
}
