import { Module } from '@nestjs/common';
import { RecipeHttpModule } from '@http';
import { RecipeApplicationModule } from '@application';
import { RecipeDomainModule } from '@domain';
import { RecipeInfrastructureModule } from '@infrastructure';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    RecipeHttpModule.register(
      RecipeApplicationModule.register(
        RecipeDomainModule.register(),
        RecipeInfrastructureModule.register(RecipeDomainModule.register()),
      ),
    ),
  ],
})
export class RecipeModule {}
