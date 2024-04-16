import { Column, Entity, Index, OneToOne } from 'typeorm';
import { BaseEntity, School } from './';
import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { Exclude } from 'class-transformer';

@Index(['email'])
@Entity()
export class Admin extends BaseEntity {
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

  @OneToOne(() => School, (school) => school.admin, {
    nullable: true,
    onDelete: 'SET NULL',
    eager: true,
  })
  managedSchool: School;
}
