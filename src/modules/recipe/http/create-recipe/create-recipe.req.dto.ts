import { IsString } from 'class-validator';

export class CreateRecipeReqDTO {
  @IsString()
  name: string;
}
