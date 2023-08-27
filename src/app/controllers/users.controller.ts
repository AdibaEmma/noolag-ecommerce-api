import {User} from '@app/entities/users.entity';
import {UsersService} from '@app/services';
import {Body, Controller, Get, Param, Put} from '@nestjs/common';
import {ApiForbiddenResponse, ApiOkResponse, ApiOperation, ApiTags} from '@nestjs/swagger';

@ApiTags('users')
@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  @ApiOperation({summary: 'Get user by id'})
  @ApiOkResponse({description: 'User returned successfully', type: User})
  @ApiForbiddenResponse({description: 'Unauthorized Request'})
  async getUserById(@Param('id') id: number): Promise<User> {
    return this.usersService.findUserById(id);
  }

  @Put(':id/roles')
  @ApiOperation({summary: 'Update user roles'})
  @ApiOkResponse({description: 'Update successful'})
  @ApiForbiddenResponse({description: 'User does not have the required role to access resource'})
  async updateUserRole(@Param('id') id: number, @Body('roles') roles: number[]) {
    return this.usersService.updateUserRoles(id, roles);
  }
}
