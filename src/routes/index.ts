import path from 'path';
import { Express } from 'express';
import {
  useExpressServer,
  RoutingControllersOptions,
  useContainer,
} from 'routing-controllers';
import { Container } from 'typedi';
import { authorizationChecker } from '@modules/auth/middlewares/AuthorizationChecker';

export function routes(app: Express): Express {
  useContainer(Container);

  const options: RoutingControllersOptions = {
    validation: true,
    cors: true,
    authorizationChecker,
    controllers: [
      path.join(__dirname, '..', '/modules/**/controllers/*{.ts,.js}'),
    ],
  };

  return useExpressServer(app, options);
}
