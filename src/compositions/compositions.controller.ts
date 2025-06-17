import { Controller, Get, Post, Put, Delete, Param, Query, Body } from '@nestjs/common';
import { Composition } from './composition.entity';
import { CompositionsService } from './compositions.service';

@Controller('compositions')
export class CompositionsController {
  constructor(private readonly service: CompositionsService) {}

  @Get()
  findAll(
    @Query('search') search?: string,
    @Query('genre') genre?: string,
    @Query('author') author?: string,
    @Query('sort') sort: string[] = ['title'],
    @Query('order') order: ('ASC' | 'DESC')[] = ['ASC'],
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ) {
    return this.service.findAll({ search, genre, author, sort, order, page, limit });
  }

  @Post()
  create(@Body() composition: Composition) {
    return this.service.create(composition);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.service.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() composition: Composition) {
    return this.service.update(id, composition);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.service.remove(id);
  }
}
