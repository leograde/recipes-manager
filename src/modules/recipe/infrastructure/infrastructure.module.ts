import { DynamicModule } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { recipePostgresProviders } from './postgres';

/**
 * This module relies on the `RecipeDomainModule`.
 * It needs access to the `RecipeFactory` in order to reconstruct
 *  a recipe from the data store format into the `Recipe` Domain entity.
 */
export class RecipeInfrastructureModule {
  static register(recipeDomainModule: DynamicModule): DynamicModule {
    return {
      module: RecipeInfrastructureModule,
      imports: [
        recipeDomainModule,
        TypeOrmModule.forRootAsync({
          inject: [ConfigService],
          useFactory: (configService: ConfigService) => ({
            type: 'postgres',
            host: configService.get('DB_HOST'),
            port: +configService.get('DB_PORT'),
            database: configService.get('DB_NAME'),
            username: configService.get('DB_USERNAME'),
            password: configService.get('DB_PASSWORD'),
          }),
        }),
      ],
      providers: [...recipePostgresProviders],
      exports: [...recipePostgresProviders],
    };
  }
}
