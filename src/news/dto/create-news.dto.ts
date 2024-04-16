import { PickType } from '@nestjs/swagger';
import { News } from 'src/entities';

export class CreateNewsDto extends PickType(News, ['title', 'content']) {}
