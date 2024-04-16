import { PickType } from '@nestjs/swagger';
import { User } from 'src/entities';

export class LoginUserDto extends PickType(User, ['email', 'password']) {}
