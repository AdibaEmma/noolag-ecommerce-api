import {User} from '@app/entities/users.entity';
import {UsersService} from '@app/services';
import {Body, Controller, Get, Param, Put} from '@nestjs/common';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  async getUserById(@Param('id') id: number): Promise<User> {
    return this.usersService.findUserById(id);
  }

  @Put(':id/roles')
  async updateUserRole(@Param('id') id: number, @Body('roles') roles: number[]) {
    return this.usersService.updateUserRoles(id, roles);
  }
}
