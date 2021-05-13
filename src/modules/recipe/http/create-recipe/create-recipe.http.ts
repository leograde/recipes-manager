import { Body, Controller, Inject, Post } from '@nestjs/common';
import { CreateRecipeUseCase, CREATE_RECIPE_USECASE } from '@application';
import { CreateRecipeHttpRequestDTO } from './create-recipe.request.dto';

export const CREATE_RECIPE_URL = 'recipes';
@Controller()
export class CreateRecipeHttp {
  constructor(
    @Inject(CREATE_RECIPE_USECASE)
    private readonly createRecipeUseCase: CreateRecipeUseCase,
  ) {}

  @Post(CREATE_RECIPE_URL)
  async execute(@Body() { name }: CreateRecipeHttpRequestDTO) {
    const recipe = await this.createRecipeUseCase.execute({ recipe: { name } });

    return recipe;
  }
}
