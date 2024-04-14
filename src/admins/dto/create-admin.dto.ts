import { PickType } from '@nestjs/swagger';
import { Admin } from 'src/entities';

export class createAdminDto extends PickType(Admin, ['email', 'name']) {}
