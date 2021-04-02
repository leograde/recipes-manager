import { Injectable } from '@nestjs/common';
import { IRecipeRepository, Recipe } from '@domain';

@Injectable()
export class RecipePostgresRepository implements IRecipeRepository {
  public async save(recipe: Recipe) {
    console.log('saving recipe', recipe);
    return undefined;
  }
}
