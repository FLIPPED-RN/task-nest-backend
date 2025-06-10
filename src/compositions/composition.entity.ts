import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Author } from '../authors/author.entity';

@Entity()
export class Composition {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  title: string;
  @Column({type: 'float'})
  duration: number;
  @Column()
  genre: string;
  @ManyToOne(() => Author, (author) => author.compositions, {onDelete: 'CASCADE'})
  author: Author
}