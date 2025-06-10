import { Controller, Get } from '@nestjs/common';
import { CompositionsService } from './compositions.service';


@Controller('compositions')
export class CompositionsController {
  constructor(private readonly appService: CompositionsService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
