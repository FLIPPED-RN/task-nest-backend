import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { Author } from './author.entity';


@Controller('authors')
export class AuthorsController {
  constructor(private readonly appService: AuthorsService) {}

  @Get()
  findAll(): Promise<Author[]> {
    return this.appService.findAll();
  }

  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.appService.findOne(id);
  }

  @Post()
  create(@Body() author: Author): Promise<Author> {
    return this.appService.create(author);
  }
}
