import { Length } from 'class-validator';

const MIN_NAME = 1;
const MAX_NAME = 50;

const MIN_EMAIL = 1;
const MAX_EMAIL = 60;

export class UpdateUserProps {
  @Length(MIN_NAME, MAX_NAME, {
    message: `name must have at least ${MIN_NAME} and maximum ${MAX_NAME} characters.`,
  })
  name: string;

  @Length(MIN_EMAIL, MAX_EMAIL, {
    message: `email must have at least ${MIN_EMAIL} and maximum ${MAX_EMAIL} characters.`,
  })
  email: string;

  password: string;
}
