import {rolesProviders} from '@app/providers/roles.provider';
import {RolesService} from '@app/services/roles.service';
import {DatabaseModule} from './database.module';
import {Module} from '@nestjs/common';

@Module({
  imports: [DatabaseModule],
  providers: [RolesService, ...rolesProviders],
  exports: [RolesService],
})
export class RolesModule {}
