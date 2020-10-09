import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { GuestType } from './guestType.entity';
import { Wedding } from './wedding.entity';

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

	@ManyToOne(
		type => GuestType,
		guest => guest.idGuestEntity,
	)
	idGuestType: number;

	@ManyToOne(
		type => Wedding,
		wedding => wedding.idWedding,
	)
	wedding: Wedding;
}
