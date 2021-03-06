import { Inject, Injectable } from '@nestjs/common';

import { RecipeFactory } from '../../domain';

@Injectable()
export class CreateRecipeUseCase {
  private readonly recipeFactory: RecipeFactory;

  constructor(@Inject('IRecipeFactory') recipeFactory: RecipeFactory) {
    this.recipeFactory = recipeFactory;
  }

  async execute({ name }: { name: string }) {
    const recipe = this.recipeFactory.createRecipe({ name });

    console.log({ recipe });
  }
}
