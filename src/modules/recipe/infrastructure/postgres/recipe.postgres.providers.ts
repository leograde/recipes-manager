import { Provider } from '@nestjs/common';
import { RECIPE_REPOSITORY } from '@domain';

import { RecipePostgresRepository } from './recipe.postgres.repository';

export const recipePostgresProviders: Provider[] = [
  { provide: RECIPE_REPOSITORY, useClass: RecipePostgresRepository },
];
