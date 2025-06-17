import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Composition } from './composition.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CompositionsService {
  constructor(
    @InjectRepository(Composition)
    private readonly repo: Repository<Composition>,
  ) {}

  async findAll(query: {
    search?: string;
    genre?: string;
    author?: string;
    sort?: string[];
    order?: ('ASC' | 'DESC')[];
    page: number;
    limit: number;
  }): Promise<Composition[]> {
    const {
      search,
      genre,
      author,
      sort = ['title'],
      order = ['ASC'],
      page,
      limit,
    } = query;

    const qb = this.repo.createQueryBuilder('composition')
      .leftJoinAndSelect('composition.author', 'author');

    if (search) {
      qb.andWhere('LOWER(composition.title) LIKE LOWER(:search)', {
        search: `%${search}%`,
      });
    }

    if (genre) {
      qb.andWhere('LOWER(composition.genre) LIKE LOWER(:genre)', {
        genre: `%${genre}%`,
      });
    }

    if (author) {
      qb.andWhere('LOWER(author.name) LIKE LOWER(:author)', {
        author: `%${author}%`,
      });
    }

    sort.forEach((field, idx) => {
      const dir = order[idx] ?? 'ASC';
      qb.addOrderBy(`composition.${field}`, dir);
    });

    return qb
      .skip((page - 1) * limit)
      .take(limit)
      .getMany();
  }

  async create(composition: Composition): Promise<Composition> {
    return this.repo.save(composition);
  }

  async findOne(id: number): Promise<Composition> {
    const item = await this.repo.findOne({
      where: { id },
      relations: ['author'],
    });

    if (!item) {
      throw new NotFoundException(`Композиция с id ${id} не найдена`);
    }

    return item;
  }

  async update(id: number, composition: Composition): Promise<Composition> {
    const existing = await this.findOne(id);
    const updated = Object.assign(existing, composition);
    return this.repo.save(updated);
  }

  async remove(id: number): Promise<void> {
    await this.repo.delete(id);
  }
}
