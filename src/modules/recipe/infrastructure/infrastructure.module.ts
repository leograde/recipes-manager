import { DynamicModule } from '@nestjs/common';

import { recipePostgresProviders } from './postgres';

/**
 * This module relies on the `RecipeDomainModule`.
 * It needs access to the `RecipeFactory` in order to reconstruct
 *  a recipe from the data store format into the `Recipe` Domain entity.
 */
export class RecipeInfrastructureModule {
  static register(recipeDomainModule: DynamicModule): DynamicModule {
    return {
      module: RecipeInfrastructureModule,
      imports: [recipeDomainModule],
      providers: [...recipePostgresProviders],
      exports: [...recipePostgresProviders],
    };
  }
}
