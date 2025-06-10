import { Injectable } from '@nestjs/common';

@Injectable()
export class CompositionsService {
  getHello(): string {
    return 'Hello Authors!';
  }
}
