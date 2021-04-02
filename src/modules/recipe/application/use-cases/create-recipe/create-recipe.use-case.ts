import { Inject, Injectable } from '@nestjs/common';
import { RecipeFactory, RECIPE_FACTORY, IRecipeRepository, RECIPE_REPOSITORY } from '@domain';

import { ICreateRecipeUseCase, ICreateRecipeRequestDTO } from './create-recipe.use-case.interface';

@Injectable()
export class CreateRecipeUseCase implements ICreateRecipeUseCase {
  constructor(
    @Inject(RECIPE_FACTORY) private readonly recipeFactory: RecipeFactory,
    @Inject(RECIPE_REPOSITORY) private readonly recipeRepository: IRecipeRepository,
  ) {}

  async execute({ recipe: recipeDTO }: ICreateRecipeRequestDTO) {
    const recipe = this.recipeFactory.createRecipe({ name: recipeDTO.name });

    await this.recipeRepository.save(recipe);
  }
}
