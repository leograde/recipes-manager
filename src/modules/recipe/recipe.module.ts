import { Module } from '@nestjs/common';

import { RecipeHttpModule } from './http';
import { RecipeApplicationModule } from './application';
import { RecipeDomainModule } from './domain';

@Module({
  imports: [
    RecipeHttpModule.register(
      RecipeApplicationModule.register(RecipeDomainModule.register()),
    ),
  ],
})
export class RecipeModule {}
