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

	@Column({ type: 'numeric', precision: 3, scale: 2, default: 0 })
	bottleCapacity: number;

	@Column({ type: 'numeric', precision: 5, scale: 2, default: 0 })
	consumingFactor: number;

	@Column('smallint', { default: 0 })
	consumersCount: number;

	@Column('smallint', { default: 0 })
	neededAmount: number;

	@Column('smallint', { default: 0 })
	boughtAmount: number;

	@Column('smallint', { default: 0 })
	remainingAmount: number;

	@Column('decimal', { default: 0 })
	price: number;
}
