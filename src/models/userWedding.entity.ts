import { Column, Entity } from 'typeorm';

@Entity('UserWedding')
export class UserWedding {
	@Column('integer')
	idWedding: number;

	@Column('integer')
	idUser: number;

	@Column('boolean')
	editPermission: boolean;
}
