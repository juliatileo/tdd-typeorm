import { IsNotEmpty, Length } from 'class-validator';

const MIN_NAME = 1;
const MAX_NAME = 50;

const MIN_EMAIL = 1;
const MAX_EMAIL = 60;

export class CreateUserProps {
  @IsNotEmpty({ message: "name can't be empty" })
  @Length(MIN_NAME, MAX_NAME, {
    message: `name must have at least ${MIN_NAME} and maximum ${MAX_NAME} characters.`,
  })
  name: string;

  @IsNotEmpty({ message: "email can't be empty" })
  @Length(MIN_EMAIL, MAX_EMAIL, {
    message: `email must have at least ${MIN_EMAIL} and maximum ${MAX_EMAIL} characters.`,
  })
  email: string;

  @IsNotEmpty({ message: "password can't be empty" })
  password: string;
}
