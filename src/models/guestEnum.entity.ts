import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('GuestEntity')
export class GuestEntity {
	@PrimaryGeneratedColumn()
	idGuestEntity: number;

	@Column({
		length: 50,
	})
	name: string;
}
