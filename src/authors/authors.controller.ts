import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Query,
  Body,
} from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { Author } from './author.entity';

@Controller('authors')
export class AuthorsController {
  constructor(private readonly service: AuthorsService) {}

  @Get()
  findAll(
    @Query('search') search?: string,
    @Query('sort') sort: string[] = ['name'],
    @Query('order') order: ('ASC' | 'DESC')[] = ['ASC'],
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ) {
    return this.service.findAll({ search, sort, order, page, limit });
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.service.findOne(id);
  }

  @Post()
  create(@Body() author: Author) {
    return this.service.create(author);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() author: Author) {
    return this.service.update(id, author);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.service.delete(id);
  }
}