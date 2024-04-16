import { PickType } from '@nestjs/swagger';
import { Admin } from 'src/entities';

export class CreateAdminDto extends PickType(Admin, [
  'email',
  'name',
  'password',
]) {}
