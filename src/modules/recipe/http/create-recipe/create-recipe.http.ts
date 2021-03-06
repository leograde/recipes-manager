import { Body, Controller, Inject, Post } from '@nestjs/common';

import { CreateRecipeUseCase } from '../../application';

import { CreateRecipeReqDTO } from './create-recipe.req.dto';

@Controller()
export class CreateRecipeHttp {
  private readonly createRecipeUseCase: CreateRecipeUseCase;

  constructor(
    @Inject('ICreateRecipeUseCase') createRecipeUseCase: CreateRecipeUseCase,
  ) {
    this.createRecipeUseCase = createRecipeUseCase;
  }

  @Post('recipes')
  async execute(@Body() { name }: CreateRecipeReqDTO) {
    await this.createRecipeUseCase.execute({ name });
  }
}
