import { PickType } from '@nestjs/swagger';
import { Admin } from 'src/entities';

export class LoginAdminDto extends PickType(Admin, ['email', 'password']) {}
