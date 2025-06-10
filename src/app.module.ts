import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Author } from './authors/author.entity';
import { Composition } from './compositions/composition.entity';
import { AuthorsModule } from './authors/authors.module';
import { CompositionsModule } from './compositions/compositions.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'vfHRBqR0',
      database: 'oc_taskdb',
      entities: [Author, Composition],
      synchronize: true,
    }),
    AuthorsModule,
    CompositionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
