import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('TaskList')
export class TaskList {
	@PrimaryGeneratedColumn()
	idTaskList: number;

	@Column()
	idWedding: number;

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
