import { Provider } from '@nestjs/common';

import { CreateRecipeUseCase } from './create-recipe.use-case';
import { CREATE_RECIPE_USECASE } from './create-recipe.use-case.interface';

export const createRecipeProviders: Provider[] = [
  { provide: CREATE_RECIPE_USECASE, useClass: CreateRecipeUseCase },
];
