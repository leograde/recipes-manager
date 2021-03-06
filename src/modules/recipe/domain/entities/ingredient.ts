import { Id } from './id';

interface IIngredientProps {
  id?: string;
  name: string;
}

class Ingredient {
  public readonly id: Id;
  public readonly name: string;

  private constructor({ id, name }: IIngredientProps) {
    this.id = Id.create({ value: id });
    this.name = name;
  }

  public static create({ id, name }: IIngredientProps) {
    return new Ingredient({ id, name });
  }
}

export { IIngredientProps, Ingredient };
