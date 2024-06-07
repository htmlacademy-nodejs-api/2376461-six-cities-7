import 'reflect-metadata';
import { Container } from 'inversify';

import { RestApplication } from './rest/rest.application.js';
import { Component } from './shared/enums/component.enum.js';
import { createRestApplicationContainer } from './rest/rest.container.js';
import { createUserContainer } from './shared/modules/user/user.container.js';
import { createOfferContainer } from './shared/modules/offer/offer.container.js';
import { createCityContainer } from './shared/modules/city/city.container.js';

async function bootstrap() {
  const appContainer = Container.merge(
    createRestApplicationContainer(),
    createUserContainer(),
    createOfferContainer(),
    createCityContainer(),
    createUserContainer(),//хз надо ли -_-
  );

  const application = appContainer.get<RestApplication>(Component.RestApplication);
  await application.init();
}

bootstrap();
