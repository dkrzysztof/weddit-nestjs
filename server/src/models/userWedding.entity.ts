import { Exclude } from 'class-transformer';
import { Column, Entity, JoinColumn, JoinTable, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';
import { Wedding } from './wedding.entity';

@Entity('UserWedding')
export class UserWedding {
	@PrimaryGeneratedColumn()
	@Exclude()
	idUserWedding: number;

	@ManyToOne(
		type => User,
		user => user.userWeddings,
		{ onDelete: 'CASCADE' },
	)
	users!: User;

	@ManyToOne(
		type => Wedding,
		wedding => wedding.userWeddings,
		{ onDelete: 'CASCADE' },
	)
	wedding!: Wedding;

	@Column('boolean')
	editPermission: boolean;
}
