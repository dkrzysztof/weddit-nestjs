import { Column, Entity, JoinColumn, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Beverage } from './beverages.entity';
import { Guest } from './guest.entity';
import { TaskList } from './taskList.entity';
import { UserWedding } from './userWedding.entity';

@Entity('Wedding')
export class Wedding {
	@PrimaryGeneratedColumn()
	idWedding: number;

	@Column({
		length: 50,
	})
	name: string;

	@Column('date')
	dateOfWedding: Date;

	@Column('time', { nullable: true })
	hourOfWedding: Date;

	@Column('time', { nullable: true })
	hourOfChurchService: Date;

	@Column('bool', { nullable: true })
	hasAfters: boolean;

	@Column('text', { nullable: true })
	address: string;

	@Column('smallint', { nullable: true })
	tablesTotalCount: number;

	@Column('smallint', { nullable: true })
	tableNumberOfMarried: number;

	@Column('decimal', { nullable: true })
	sumCostTask: number;

	@Column('decimal', { nullable: true })
	sumCostBeverage: number;

	@Column('decimal', { nullable: true })
	sumCost: number;

	@Column('decimal', { nullable: true, precision: 8, scale: 2 })
	budget: number;

	@Column('decimal', { nullable: true })
	exceedBudget: number;

	@Column('json', { nullable: true })
	seatChart: string;

	@OneToMany(
		type => Beverage,
		beverage => beverage.wedding,
		{ cascade: true },
	)
	beverages: Beverage[];

	@OneToMany(
		type => TaskList,
		taskList => taskList.wedding,
		{ cascade: true },
	)
	taskLists: TaskList[];

	@OneToMany(
		type => Guest,
		guest => guest.wedding,
		{ cascade: true },
	)
	@JoinColumn()
	guests: Guest[];

	@OneToMany(
		type => UserWedding,
		userWedding => userWedding.wedding,
		{ cascade: true },
	)
	@JoinColumn()
	userWeddings: UserWedding[];
}
