import { UnprocessableEntityException } from '@nestjs/common';

enum MeasurementEnum {
  tbsp = 'tbsp',
  cup = 'cup',
  ml = 'ml',
  liter = 'liter',
  g = 'g',
  kg = 'kg',
}

interface IQuantityProps {
  amount: number;
  measurement: string;
}

class Quantity {
  private static readonly MIN_AMOUNT = 0;
  private static readonly MAX_AMOUNT = 100000;

  public readonly amount: number;
  public readonly measurement: MeasurementEnum;

  private constructor({ amount, measurement }: { amount: number; measurement: MeasurementEnum }) {
    this.amount = amount;
    this.measurement = measurement;
  }

  public static create({ amount, measurement }: IQuantityProps) {
    if (amount < this.MIN_AMOUNT && amount > this.MAX_AMOUNT) {
      throw new UnprocessableEntityException(
        `You provided the amount ${amount}. 
        However, the amount needs to be between ${this.MIN_AMOUNT} and ${this.MAX_AMOUNT}`,
      );
    }

    if (!(measurement in MeasurementEnum)) {
      throw new UnprocessableEntityException(
        `The measurement ${measurement} is invalid.
        Please provide one of the following measurements:
        ${MeasurementEnum}`,
      );
    }

    return new Quantity({
      amount,
      measurement: measurement as MeasurementEnum,
    });
  }
}

export { MeasurementEnum, IQuantityProps, Quantity };
