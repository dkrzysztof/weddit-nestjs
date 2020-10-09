import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Wedding } from './wedding.entity';

@Entity('TaskList')
export class TaskList {
	@PrimaryGeneratedColumn()
	idTaskList: number;

	@ManyToOne(
		type => Wedding,
		wedding => wedding.taskLists,
	)
	wedding: Wedding;

	@Column('text')
	description: string;

	@Column('date')
	deadline: Date;

	@Column('text')
	dutyHolderFullName: string;

	@Column('bool')
	isComplete: boolean;

	@Column('decimal')
	cost: number;

	@Column({
		length: 80,
	})
	contactPersonFullName: string;

	@Column({
		length: 15,
	})
	contactPersonPhone: string;

	@Column({
		length: 50,
	})
	contactPersonEmail: string;

	@Column('text')
	notes: string;
}
