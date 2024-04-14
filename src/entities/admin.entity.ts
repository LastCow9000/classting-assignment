import { Column, Entity, OneToOne } from 'typeorm';
import { BaseEntity, School } from './';

@Entity()
export class Admin extends BaseEntity {
  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @OneToOne(() => School, (school) => school.admin, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  managedSchool: School;
}
