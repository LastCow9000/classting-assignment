import { Column, Entity, OneToOne } from 'typeorm';
import { BaseEntity, School } from './';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

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

  @OneToOne(() => School, (school) => school.admin, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  managedSchool: School;
}
