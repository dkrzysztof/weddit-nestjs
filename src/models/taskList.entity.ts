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

	@Column('text', { nullable: true })
	description: string;

	@Column('date')
	deadline: Date;

	@Column('text')
	dutyHolderFullName: string;

	@Column('bool', { default: false })
	isComplete: boolean;

	@Column('decimal')
	cost: number;

	@Column({
		length: 80,
		nullable: true,
	})
	contactPersonFullName: string;

	@Column({
		length: 15,
		nullable: true,
	})
	contactPersonPhone: string;

	@Column({
		length: 50,
		nullable: true,
	})
	contactPersonEmail: string;

	@Column('text', { nullable: true })
	notes: string;
}
