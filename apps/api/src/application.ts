import { BootMixin } from '@loopback/boot'
import { ApplicationConfig } from '@loopback/core'
import {
  RestExplorerBindings,
  RestExplorerComponent,
} from '@loopback/rest-explorer'
import { RepositoryMixin } from '@loopback/repository'
import { RestApplication } from '@loopback/rest'
import { ServiceMixin } from '@loopback/service-proxy'
import path from 'path'
import { MySequence } from './sequence'
import { USERS_SERVICE } from './domains/users/keys'
import { UserService } from './domains/users/services/user.service'
import { TypeOrmMixin } from '@loopback/typeorm'
import { PostgresConnection } from './connections'

export { ApplicationConfig }

export class ApiApplication extends BootMixin(
  ServiceMixin(RepositoryMixin(TypeOrmMixin(RestApplication))),
) {
  constructor(options: ApplicationConfig = {}) {
    super(options)
    this.connection(PostgresConnection)

    this.setupBindings()

    this.sequence(MySequence)

    this.static('/', path.join(__dirname, '../public'))

    this.configure(RestExplorerBindings.COMPONENT).to({
      path: '/explorer',
    })
    this.component(RestExplorerComponent)

    this.projectRoot = __dirname
    // Customize @loopback/boot Booter Conventions here
    this.bootOptions = {
      controllers: {
        // Customize ControllerBooter Conventions here
        dirs: ['domains/**/**/controllers'],
        extensions: ['.controller.js'],
        nested: true,
      },
    }
  }

  setupBindings(): void {
    this.bind(USERS_SERVICE).toClass(UserService)
  }
}
