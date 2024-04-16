import { Column, Entity, Index, OneToOne } from 'typeorm';
import { BaseEntity, School } from './';
import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Admin extends BaseEntity {
  @ApiProperty({
    required: true,
    example: 'test1@google.com',
    description: '이메일(계정)',
  })
  @IsNotEmpty()
  @IsEmail()
  @Column({ unique: true })
  email: string;

  @ApiProperty({ required: true, example: '아이유', description: '이름' })
  @IsNotEmpty()
  @IsString()
  @Column()
  name: string;

  @ApiProperty({
    required: true,
    example: 'pass1234',
    description: '아이디(PK)',
    maxLength: 16,
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(16)
  @Exclude({ toPlainOnly: true })
  @Column()
  password: string;

  @OneToOne(() => School, (school) => school.admin, {
    nullable: true,
    onDelete: 'SET NULL',
    eager: true,
  })
  managedSchool: School;
}
