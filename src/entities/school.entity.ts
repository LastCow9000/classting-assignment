import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { Admin, BaseEntity, News, Subscription } from './';

@Entity()
export class School extends BaseEntity {
  @Column()
  name: string;

  @Column()
  region: string;

  @OneToOne(() => Admin, (admin) => admin.managedSchool)
  @JoinColumn()
  admin: Admin;

  @OneToMany(() => News, (news) => news.school)
  news: News[];

  @OneToMany(() => Subscription, (subscription) => subscription.school)
  subscriptions: Subscription[];
}
