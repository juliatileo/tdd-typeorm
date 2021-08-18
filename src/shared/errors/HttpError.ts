import { HTTPStatus } from './HttpStatus';

export class HTTPError extends Error {
  status: HTTPStatus;

  constructor(
    status: HTTPStatus = HTTPStatus.INTERNAL_SERVER_ERROR,
    message?: string
  ) {
    super(message);

    Object.setPrototypeOf(this, HTTPError.prototype);

    this.status = status;
    this.stack = null;
  }
}
