import { DynamicModule } from '@nestjs/common';

import { CreateRecipeHttp } from './create-recipe';

/**
 * This module relies on the `RecipeApplicationModule`.
 * It needs access to the use-cases, such as `CreateRecipeUseCase`.
 */
export class RecipeHttpModule {
  static register(recipeApplicationModule: DynamicModule): DynamicModule {
    return {
      module: RecipeHttpModule,
      imports: [recipeApplicationModule],
      controllers: [CreateRecipeHttp],
    };
  }
}
