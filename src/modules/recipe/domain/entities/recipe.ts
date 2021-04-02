import { Id } from './id';
import { IngredientQuantity } from './ingredient-quantity';

interface IRecipeProps {
  id?: string;
  name: string;
  ingredientQuantities?: IngredientQuantity[];
}

class Recipe {
  id: Id;
  name: string;
  ingredientQuantities: IngredientQuantity[];

  private constructor({ id, name, ingredientQuantities = [] }: IRecipeProps) {
    this.id = Id.create({ value: id });
    this.name = name;
    this.ingredientQuantities = ingredientQuantities;
  }

  addIngredientQuantity({ ingredientQuantity }: { ingredientQuantity: IngredientQuantity }) {
    this.ingredientQuantities = [
      ...this.ingredientQuantities.filter(
        ({ ingredient }) => ingredient.id === ingredientQuantity.ingredient.id,
      ),
      ingredientQuantity,
    ];
  }

  static create({ id, name, ingredientQuantities }: IRecipeProps) {
    return new Recipe({ id, name, ingredientQuantities });
  }
}

export { IRecipeProps, Recipe };
