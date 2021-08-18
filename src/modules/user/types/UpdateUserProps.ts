import { IsNotEmpty, Length } from 'class-validator';

const MIN_NAME = 1;
const MAX_NAME = 50;

export class UpdateUserProps {
  @IsNotEmpty({ message: "Name can't be empty" })
  @Length(MIN_NAME, MAX_NAME, {
    message: `Name must have at least ${MIN_NAME} and maximum ${MAX_NAME} characters.`,
  })
  name: string;
}
