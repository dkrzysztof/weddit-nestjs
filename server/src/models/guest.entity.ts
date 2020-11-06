import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, RelationId } from 'typeorm';
import { GuestType } from './guestType.entity';
import { Wedding } from './wedding.entity';

@Entity('Guest')
export class Guest {
	@PrimaryGeneratedColumn()
	idGuest: number;

	@Column({
		length: 30,
	})
	firstName: string;

	@Column({
		length: 50,
	})
	lastName: string;

	@Column({ nullable: true, default: false })
	confirmed: boolean;

	@Column({ nullable: true, default: false })
	confirmedAfters: boolean;

	@Column('smallint', { nullable: true })
	numberTable: number;

	@Column('smallint', { nullable: true })
	numberSeat: number;

	@ManyToOne(
		type => GuestType,
		guestType => guestType.guests,
		{ onDelete: 'SET NULL' },
	)
	guestType!: GuestType;

	@ManyToOne(
		type => Wedding,
		wedding => wedding.guests,
		{ onDelete: 'CASCADE' },
	)
	wedding!: Wedding;
}
