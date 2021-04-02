/**
 * Value Objects are immutable. If we need to change it,
 * we construct a new instance based on the existing one.
 */
export abstract class ValueObject<T> {
  protected readonly props: T;

  protected constructor(props: T) {
    this.props = props;
  }

  /**
   * ValueObjects are compared by their structural equality.
   *
   * @param valueObject - The value to be compared to.
   * @returns Whether the value object is equal another value object.
   */
  public equals(valueObject: ValueObject<T>): boolean {
    return JSON.stringify(this.props) === JSON.stringify(valueObject.props);
  }
}
