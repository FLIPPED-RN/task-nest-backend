import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Composition } from '../compositions/composition.entity';

@Entity()
export class Author {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column({nullable: true})
  website: string;
  @OneToMany(() => Composition, (composition) => composition.author)
  compositions: Composition[];
}