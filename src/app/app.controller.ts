import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtAuthGuard } from 'src/auth/auth.guard';

// @Controller()
// export class AppController {
//   constructor(private readonly appService: AppService) {}

//   @Get()
//   getHello(): string {
//     return this.appService.getHello();
//   }
// }
@Controller('app')
export class AppController {
  @Get('protected')
  @UseGuards(JwtAuthGuard)
  getProtected() {
    return 'This is a protected route';
  }
}
