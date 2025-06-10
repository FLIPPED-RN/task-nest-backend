import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Author } from './author.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectRepository(Author)
    private authorsRepository: Repository<Author>,
  ) {}

  findAll(): Promise<Author[]> {
    return this.authorsRepository.find({relations: ['compositions']});
  }

  async findOne(id: number): Promise<Author | null> {
    const author = await this.authorsRepository.findOneBy({id});
    if (!author) {
      throw new NotFoundException(`Автор с id ${id} не найден`);
    }
    return author;
  }

  async create(author: Author): Promise<Author> {
    return this.authorsRepository.save(author);
  }

  async delete(id: number): Promise<void> {
    await this.authorsRepository.delete(id);
  }
}
