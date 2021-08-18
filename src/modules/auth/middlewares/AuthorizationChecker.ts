import { Action } from 'routing-controllers';
import { verify } from 'jsonwebtoken';
import { APP_SECRET } from '@config/env';
import { HTTPStatus, HTTPError } from '@shared/errors/index';
import { Token } from '../types/Token';

interface Request extends Action {
  request: {
    headers: {
      authorization: string;
    };
  };
}

export function authorizationChecker(
  action: Request,
  requirements: string[]
): boolean {
  const header = action.request.headers.authorization;

  if (!header)
    throw new HTTPError(
      HTTPStatus.UNAUTHORIZED,
      'missing authorization header'
    );

  const [, token] = header.split(' ');

  let roles: string[] = [];

  try {
    const jwt = verify(token, APP_SECRET) as Token;
    roles = jwt.roles;
  } catch (err) {
    throw new HTTPError(HTTPStatus.FORBIDDEN, 'invalid permissons');
  }

  if (
    requirements.length &&
    roles.every((role) => requirements.every((required) => required !== role))
  ) {
    throw new HTTPError(HTTPStatus.FORBIDDEN, 'invalid permissions');
  }

  return true;
}
