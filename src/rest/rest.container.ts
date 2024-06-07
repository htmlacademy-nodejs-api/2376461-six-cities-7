import { Container } from 'inversify';

import { RestApplication } from './rest.application.js';
import { Component } from '../shared/enums/component.enum.js';
import { Logger, PinoLogger} from '../shared/libs/logger/index.js';
import { Config, RestConfig, RestSchema } from '../shared/libs/config/index.js';
import { DatabaseClient, MongoDatabaseClient } from '../shared/libs/database-client/index.js';
import { UserEntity, UserModel } from '../shared/modules/user/user.entity.js';

export function createRestApplicationContainer() {
  const restApplicationContainer = new Container();

  restApplicationContainer.bind<RestApplication>(Component.RestApplication).to(RestApplication).inRequestScope();
  restApplicationContainer.bind<Logger>(Component.Logger).to(PinoLogger).inSingletonScope();
  restApplicationContainer.bind<Config<RestSchema>>(Component.Config).to(RestConfig).inSingletonScope();
  restApplicationContainer.bind<DatabaseClient>(Component.DatabaseClient).to(MongoDatabaseClient).inSingletonScope();
  restApplicationContainer.bind<UserEntity>(Component.UserModel).to(UserModel).inRequestScope();

  return restApplicationContainer;
}
