import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';
import { Wedding } from './wedding.entity';

@Entity('UserWedding')
export class UserWedding {
	@PrimaryGeneratedColumn()
	idUserWedding: number;

	@ManyToOne(
		type => User,
		user => user.userWeddings,
	)
	users: User;

	@ManyToOne(
		type => Wedding,
		wedding => wedding.userWeddings,
	)
	wedding: Wedding;

	@Column('boolean')
	editPermission: boolean;
}
