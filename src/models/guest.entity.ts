import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Guest')
export class Guest {
	@PrimaryGeneratedColumn()
	idGuest: number;

	@Column()
	idWedding: number;

	@Column({
		length: 30,
	})
	firstName: string;

	@Column({
		length: 50,
	})
	lastName: string;

	@Column()
	confirmed: boolean;

	@Column()
	confirmedAfters: boolean;

	@Column('smallint')
	numberTable: number;

	@Column('smallint')
	numberSeat: number;

	@Column('integer')
	idGuestEnum: number;
}
