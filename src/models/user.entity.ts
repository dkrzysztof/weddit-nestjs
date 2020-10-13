import { Exclude } from 'class-transformer/decorators';
import { IsNotEmpty, MinLength } from 'class-validator';
import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	ManyToMany,
	JoinTable,
	ManyToOne,
	OneToMany,
	Unique,
	JoinColumn,
} from 'typeorm';
import { UserWedding } from './userWedding.entity';
import { Wedding } from './wedding.entity';

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
	@Column({ length: 50, unique: true })
	email: string;

	@IsNotEmpty()
	@MinLength(6)
	@Column({
		length: 60,
		unique: true,
	})
	password: string;

	@Column({
		default: false,
	})
	isAdmin: boolean;

	@Exclude()
	public currentHashedRefreshToken?: string;

	@Column({
		type: 'timestamp',
		name: 'created_at',
		default: () => 'CURRENT_TIMESTAMP',
	})
	createdAt: Date;

	@OneToMany(
		type => UserWedding,
		userWedding => userWedding.users,
		{ cascade: true },
	)
	@JoinColumn()
	userWeddings: UserWedding[];
}
