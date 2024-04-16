import { Column, Entity, Index, OneToMany, OneToOne } from 'typeorm';
import { BaseEntity, Newsfeed, Subscription } from './';
import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class User extends BaseEntity {
  @ApiProperty({
    required: true,
    example: 'test1@google.com',
    description: '이메일(계정)',
  })
  @IsNotEmpty()
  @IsEmail()
  @Column({ unique: true })
  email: string;

  @ApiProperty({
    required: true,
    example: '아이유',
    description: '이름',
  })
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

  @OneToMany(() => Subscription, (subscription) => subscription.user)
  subscriptions: Subscription[];

  @OneToOne(() => Newsfeed, (newsfeed) => newsfeed.user, { eager: true })
  newsfeed: Newsfeed;
}
