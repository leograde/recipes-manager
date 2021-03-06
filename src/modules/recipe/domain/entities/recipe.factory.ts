import { Injectable } from '@nestjs/common';
import { Recipe, IRecipeProps } from './recipe';

@Injectable()
export class RecipeFactory {
  createRecipe(recipeProps: IRecipeProps): Recipe {
    return Recipe.create(recipeProps);
  }
}
