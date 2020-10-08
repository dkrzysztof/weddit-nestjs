import { IsNotEmpty } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Drink')
export class Drink {
	@PrimaryGeneratedColumn()
	idDrink: number;

	@IsNotEmpty()
	@Column({
		length: 100,
	})
	name: string;

	@Column({ type: 'numeric', precision: 3, scale: 2 })
	bottleCapacity: number;

	@Column({ type: 'numeric', precision: 5, scale: 2 })
	consumingFactor: number;

	@Column('smallint')
	consumersCount: number;

	@Column('smallint')
	neededAmount: number;

	@Column('smallint')
	boughtAmount: number;

	@Column('smallint')
	remainingAmount: number;

	@Column('decimal')
	price: number;
}
