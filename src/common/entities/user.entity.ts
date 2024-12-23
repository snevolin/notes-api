import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Note } from '../../common/entities';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column({ default: 'user' })
  role: string; // 'user', 'super-admin', etc.

  @OneToMany(() => Note, (note) => note.author)
  notes: Note[];
}
