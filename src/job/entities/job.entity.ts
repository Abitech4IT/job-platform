import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Job {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  title: string;

  @Column({ type: 'text' })
  desription: string;

  @Column()
  company: string;

  @Column()
  type: string;

  @Column('text', { array: true })
  tags: string[];

  @Column()
  location: string;

  @Column()
  salary: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
