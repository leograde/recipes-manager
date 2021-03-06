import { v4 } from 'uuid';

interface IIdProps {
  value?: string;
}

export class Id {
  public readonly value: string;

  private constructor(value?: string) {
    this.value = value ?? v4();
  }

  public static create({ value }: IIdProps): Id {
    return new Id(value);
  }
}
