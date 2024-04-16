import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateNewsDto {
  @ApiProperty({
    required: false,
    example: '공지사항을 전달합니다.',
    description: '소식 제목',
  })
  @IsString()
  @IsOptional()
  title: string;

  @ApiProperty({
    required: false,
    example: '안녕하세요. 이번달 공지사항을 전달드립니다.',
    description: '소식 내용',
  })
  @IsString()
  @IsOptional()
  content: string;
}
