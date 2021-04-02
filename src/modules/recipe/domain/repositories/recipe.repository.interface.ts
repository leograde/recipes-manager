import { Recipe } from '../entities';

export const RECIPE_REPOSITORY = 'RECIPE_REPOSITORY';

export interface IRecipeRepository {
  save: (recipe: Recipe) => Promise<void>;
}
