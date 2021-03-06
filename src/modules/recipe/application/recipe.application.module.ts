import { DynamicModule } from '@nestjs/common';

import { CreateRecipeUseCase } from './use-cases';

export class RecipeApplicationModule {
  static register(recipeDomain: DynamicModule): DynamicModule {
    return {
      module: RecipeApplicationModule,
      imports: [recipeDomain],
      providers: [
        { provide: 'ICreateRecipeUseCase', useClass: CreateRecipeUseCase },
      ],
      exports: [
        { provide: 'ICreateRecipeUseCase', useClass: CreateRecipeUseCase },
      ],
    };
  }
}
