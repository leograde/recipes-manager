import { Injectable } from '@nestjs/common';
import { Recipe, IRecipeProps } from './recipe';

export const RECIPE_FACTORY = 'RECIPE_FACTORY';

@Injectable()
export class RecipeFactory {
  createRecipe(recipeProps: IRecipeProps): Recipe {
    console.log('hello');
    return Recipe.create(recipeProps);
  }
}
