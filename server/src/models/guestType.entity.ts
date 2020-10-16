import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Guest } from './guest.entity';

@Entity('GuestType')
export class GuestType {
	@PrimaryGeneratedColumn()
	idGuestType: number;

	@Column({
		length: 50,
	})
	name: string;

	@OneToMany(
		type => Guest,
		guest => guest.guestType,
	)
	guests: Guest[];
}
