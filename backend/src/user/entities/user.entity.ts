import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
/*
 *typeorm is a package that allows you to interact with a database using TypeScript.
 * The following code defines a User class as a database table.
 * The User class is decorated with the @Entity decorator to define it as a database table.
 * Entity is a decorator that defines a class as a database table.
 * PrimaryGeneratedColumn is a decorator that defines a column as a primary key.
 * Column is a decorator that defines a column in the database table.
 * The User class is a TypeScript class that represents a database table.
 */

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @PrimaryColumn()
  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  role: string;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;
}
