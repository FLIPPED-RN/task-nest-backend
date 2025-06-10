import { Module } from '@nestjs/common';
import { CompositionsController } from './compositions.controller';
import { CompositionsService } from './compositions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Composition } from './composition.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Composition])],
  controllers: [CompositionsController],
  providers: [CompositionsService],
})
export class CompositionsModule {}