import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Author } from './author.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectRepository(Author)
    private readonly repo: Repository<Author>,
  ) {}

  async findAll(query: {
    search?: string;
    sort?: string[];
    order?: ('ASC' | 'DESC')[];
    page: number;
    limit: number;
  }): Promise<Author[]> {
    const {
      search,
      sort = ['name'],
      order = ['ASC'],
      page,
      limit,
    } = query;

    const qb = this.repo.createQueryBuilder('author')
      .leftJoinAndSelect('author.compositions', 'composition');

    if (search) {
      qb.where('LOWER(author.name) LIKE LOWER(:search)', {
        search: `%${search}%`,
      });
    }

    sort.forEach((field, idx) => {
      const dir = order[idx] ?? 'ASC';
      qb.addOrderBy(`author.${field}`, dir);
    });

    return qb
      .skip((page - 1) * limit)
      .take(limit)
      .getMany();
  }

  async findOne(id: number): Promise<Author> {
    const author = await this.repo.findOne({
      where: { id },
      relations: ['compositions'],
    });

    if (!author) {
      throw new NotFoundException(`Автор с id ${id} не найден`);
    }

    return author;
  }

  async create(author: Author): Promise<Author> {
    return this.repo.save(author);
  }

  async update(id: number, author: Author): Promise<Author> {
    const existing = await this.findOne(id);
    const updated = Object.assign(existing, author);
    return this.repo.save(updated);
  }

  async delete(id: number): Promise<void> {
    await this.repo.delete(id);
  }
}
