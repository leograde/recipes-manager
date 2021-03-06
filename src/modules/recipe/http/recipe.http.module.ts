import { DynamicModule } from '@nestjs/common';

import { CreateRecipeHttp } from './create-recipe';

export class RecipeHttpModule {
  static register(recipeApplicationModule: DynamicModule): DynamicModule {
    return {
      module: RecipeHttpModule,
      imports: [recipeApplicationModule],
      controllers: [CreateRecipeHttp],
    };
  }
}
