import { DynamicModule } from '@nestjs/common';

import { RecipeFactory } from './entities';

export class RecipeDomainModule {
  static register(): DynamicModule {
    return {
      module: RecipeDomainModule,
      providers: [{ provide: 'IRecipeFactory', useClass: RecipeFactory }],
      exports: [{ provide: 'IRecipeFactory', useClass: RecipeFactory }],
    };
  }
}
