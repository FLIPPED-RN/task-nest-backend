import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Author } from './authors/author.entity';
import { Composition } from './compositions/composition.entity';
import { AuthorsModule } from './authors/authors.module';
import { CompositionsModule } from './compositions/compositions.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '5432'),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
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
