import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Guest } from './guest.entity';

@Entity('GuestType')
export class GuestType {
	@PrimaryGeneratedColumn()
	idGuestEntity: number;

	@Column({
		length: 50,
	})
	name: string;
}
