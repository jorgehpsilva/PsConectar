// src/app.controller.ts

import { Controller, Get, Req } from '@nestjs/common';
import { RequestWithUser } from './common/interfaces/request-with-user'; 
import { UsersService } from './users/users.service'; 

@Controller()
export class AppController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  getProfile(@Req() req: RequestWithUser) {
    return this.usersService.findOne(req.user.userId);
  }
}
