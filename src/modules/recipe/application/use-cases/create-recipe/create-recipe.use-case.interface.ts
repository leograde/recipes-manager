import { Recipe } from '@domain';
import { IUseCase } from '@utils';

export interface ICreateRecipeRequestDTO {
  recipe: {
    name: string;
  };
}

export const CREATE_RECIPE_USECASE = 'CREATE_RECIPE_USECASE';

export type ICreateRecipeUseCase = IUseCase<ICreateRecipeRequestDTO, Promise<Recipe>>;
