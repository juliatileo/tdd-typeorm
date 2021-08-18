import { IsNotEmpty } from 'class-validator';

export class AuthProps {
  @IsNotEmpty({ message: "email can't be empty" })
  email: string;

  @IsNotEmpty({ message: "password can't be empty" })
  password: string;
}
