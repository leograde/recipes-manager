/**
 * Entity is where the business logic is located.
 * It expresses what a particular model can do, when it can do it,
 * and the conditions that dictate when it can do that thing.
 * We only expose operations that are meaningful and valid to the domain.
 */

interface EntityWithId {
  id?: string;
}

export abstract class Entity<T extends EntityWithId> {
  protected props: T;

  protected constructor(props: T) {
    this.props = props;
  }

  /**
   * Entities are compared by its id - Identifier Equality.
   *
   * @param entity - The object to be compared to.
   * @returns Entity<T>.
   */
  public equals(entity: Entity<T>): boolean {
    if (this === entity) return true;

    return this.props.id === entity.props.id;
  }
}
