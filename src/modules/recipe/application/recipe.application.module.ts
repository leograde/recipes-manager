import { DynamicModule } from '@nestjs/common';

import { createRecipeProviders } from './use-cases';

/**
 * This module relies on `RecipeDomainModule` and `RecipeInfrastructureModule`.
 * It needs access to the `RecipeFactory` from `RecipeDomainModule` to create
 * the Recipe entity and also to `RecipeRepository` to persis the entity into
 * a data store.
 */
export class RecipeApplicationModule {
  static register(recipeDomain: DynamicModule, recipeInfrastructure: DynamicModule): DynamicModule {
    return {
      module: RecipeApplicationModule,
      imports: [recipeDomain, recipeInfrastructure],
      providers: [...createRecipeProviders],
      exports: [...createRecipeProviders],
    };
  }
}
