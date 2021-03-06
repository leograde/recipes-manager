import { Module } from '@nestjs/common';

import { RecipeModule } from './modules';

@Module({
  imports: [RecipeModule],
})
export class AppModule {}
