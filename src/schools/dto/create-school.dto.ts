import { PickType } from '@nestjs/swagger';
import { School } from 'src/entities';

export class CreateSchoolDto extends PickType(School, ['name', 'region']) {}
