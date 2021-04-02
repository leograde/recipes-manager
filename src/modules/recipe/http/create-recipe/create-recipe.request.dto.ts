import { IsString } from 'class-validator';

export class CreateRecipeHttpRequestDTO {
  @IsString()
  public name: string;
}
