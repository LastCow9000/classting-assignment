import { Column, Entity, OneToMany, OneToOne } from 'typeorm';
import { BaseEntity, Newsfeed, Subscription } from './';
import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { Exclude } from 'class-transformer';

@Entity()
export class User extends BaseEntity {
  @IsNotEmpty()
  @IsEmail()
  @Column({ unique: true })
  email: string;

  @IsNotEmpty()
  @IsString()
  @Column()
  name: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(16)
  @Exclude({ toPlainOnly: true })
  @Column()
  password: string;

  @OneToMany(() => Subscription, (subscription) => subscription.user)
  subscriptions: Subscription[];

  @OneToOne(() => Newsfeed, (newsfeed) => newsfeed.user)
  newsfeed: Newsfeed;
}
