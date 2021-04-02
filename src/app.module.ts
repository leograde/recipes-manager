import { Module } from '@nestjs/common';
import { RecipeModule } from '@app/modules';

@Module({
  imports: [RecipeModule],
})
export class AppModule {}
