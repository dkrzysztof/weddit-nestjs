import { IsNotEmpty, MinLength } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('User')
export class User {
	@PrimaryGeneratedColumn()
	idUser: number;

	@IsNotEmpty()
	@Column({
		length: 30,
	})
	firstName: string;

	@IsNotEmpty()
	@Column({
		length: 50,
	})
	lastName: string;

	@IsNotEmpty()
	@Column({ length: 50 })
	email: string;

	@IsNotEmpty()
	@MinLength(6)
	@Column({
		length: 50,
	})
	password: string;

	@Column({
		default: false,
	})
	isAdmin: boolean;

	@Column({
		type: 'timestamp',
		name: 'created_at',
		default: () => 'CURRENT_TIMESTAMP',
	})
	createdAt: Date;
}
