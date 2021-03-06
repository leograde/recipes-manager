import { Ingredient } from './ingredient';
import { Quantity } from './quantity';

interface IIngredientQuantityProps {
  ingredient: Ingredient;
  quantity: Quantity;
}

class IngredientQuantity {
  public readonly ingredient: Ingredient;
  public readonly quantity: Quantity;

  private constructor({ ingredient, quantity }: IIngredientQuantityProps) {
    this.ingredient = ingredient;
    this.quantity = quantity;
  }

  public static create({ ingredient, quantity }: IIngredientQuantityProps) {
    return new IngredientQuantity({ ingredient, quantity });
  }
}

export { IIngredientQuantityProps, IngredientQuantity };
