import { DynamicModule } from '@nestjs/common';

import { RecipeFactory, RECIPE_FACTORY } from './entities';

/**
 * This module does not need to know about any other module.
 * It provides the `RecipeFactory` so that Domain objects can be created.
 */
export class RecipeDomainModule {
  static register(): DynamicModule {
    return {
      module: RecipeDomainModule,
      providers: [{ provide: RECIPE_FACTORY, useClass: RecipeFactory }],
      exports: [{ provide: RECIPE_FACTORY, useClass: RecipeFactory }],
    };
  }
}
