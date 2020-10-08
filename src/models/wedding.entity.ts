import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Wedding')
export class Wedding {
	@PrimaryGeneratedColumn()
	idWedding: number;

	@Column('date')
	dateOfWedding: Date;

	@Column('time')
	hourOfWedding: Date;

	@Column('time')
	hourOfChurchService: Date;

	@Column('bool')
	hasAfters: boolean;

	@Column('text')
	address: string;

	@Column('smallint')
	tablesTotalCount: number;

	@Column('smallint')
	tableNumberOfMarried: number;

	@Column('decimal')
	sumCostTask: number;

	@Column('decimal')
	sumCostDrink: number;

	@Column('decimal')
	sumCost: number;

	@Column('decimal')
	budget: number;

	@Column('decimal')
	exceedBudget: number;
}
