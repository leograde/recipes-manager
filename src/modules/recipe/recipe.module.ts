import { Module } from '@nestjs/common';

import { RecipeHttpModule } from './http';
import { RecipeApplicationModule } from './application';
import { RecipeDomainModule } from './domain';
import { RecipeInfrastructureModule } from './infrastructure';

@Module({
  imports: [
    RecipeHttpModule.register(
      RecipeApplicationModule.register(
        RecipeDomainModule.register(),
        RecipeInfrastructureModule.register(RecipeDomainModule.register()),
      ),
    ),
  ],
})
export class RecipeModule {}
