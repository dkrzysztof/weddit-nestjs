import { IsNotEmpty } from 'class-validator';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Wedding } from './wedding.entity';

@Entity('Drink')
export class Drink {
	@PrimaryGeneratedColumn()
	idDrink: number;

	@ManyToOne(
		type => Wedding,
		wedding => wedding.drinks,
	)
	wedding: Wedding;

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
