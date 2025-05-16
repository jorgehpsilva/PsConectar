import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  Query,
  UseGuards,
  Req,
  ForbiddenException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import { Request } from 'express';
import { RequestWithUser } from '../common/interfaces/request-with-user';




@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  findMe(@Req() req: RequestWithUser) {
    return this.usersService.findOne(req.user.userId);
}

  // 🔍 Listagem de usuários (somente admin)
  @Get()
  @Roles('admin')
  findAll(
    @Query('role') role?: string,
    @Query('sortBy') sortBy?: 'name' | 'createdAt',
    @Query('order') order?: 'asc' | 'desc',
  ) {
    return this.usersService.findAll({ role, sortBy, order });
  }

  //  Perfil do usuário autenticado
  @Get('profile')
  getProfile(@Req() req: RequestWithUser) {
     return this.usersService.findOne(req.user.userId);
}

  //  Atualizar o próprio perfil ou qualquer usuário (se for admin)
  @Post()
createUser(@Req() req: RequestWithUser) {
  const requester = req.user.userId;
  
}

  //  Excluir usuário (somente admin)
  @Delete(':id')
  @Roles('admin')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }

  //  Listar usuários inativos (último login > 30 dias)
  @Get('inactive')
  @Roles('admin')
  getInactiveUsers() {
    return this.usersService.findInactiveUsers();
  }
}
