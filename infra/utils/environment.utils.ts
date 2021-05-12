import { Construct } from '@aws-cdk/core';

/**
 * Gets the environment from the running cdk context.
 *
 * @param scope - The cdk application scope.
 * @throws Environment is missing from the context.
 * @returns The environment.
 */
export function getEnvironment(scope: Construct): string {
  const environment = scope.node.tryGetContext('environment') as string;

  if (!environment) {
    throw new Error('environment must be set in cdk context');
  }

  return environment;
}
