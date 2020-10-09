import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Drink } from './drink.entity';
import { Guest } from './guest.entity';
import { TaskList } from './taskList.entity';
import { User } from './user.entity';
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

	@OneToMany(
		type => Drink,
		drink => drink.wedding,
	)
	drinks: Drink[];

	@OneToMany(
		type => TaskList,
		taskList => taskList.wedding,
	)
	taskLists: TaskList[];

	@OneToMany(
		type => Guest,
		guest => guest.wedding,
	)
	guests: Guest[];

	@OneToMany(
		type => UserWedding,
		userWedding => userWedding.wedding,
	)
	userWeddings: UserWedding[];
}
