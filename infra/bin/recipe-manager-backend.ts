import { App, Tags } from '@aws-cdk/core';

import { getEnvironment } from '../utils';
import { RecipeManagerBackendStack } from '../lib';

const recipeManagerBackendApp = new App();

const environment = getEnvironment(recipeManagerBackendApp);

const recipeManagerBackendStack = new RecipeManagerBackendStack(
  recipeManagerBackendApp,
  `recipe-manager-backend-${environment}`,
  {},
);

const tags = Tags.of(recipeManagerBackendStack);
tags.add('environment', environment);
tags.add('project', 'recipe-manager-backend');
