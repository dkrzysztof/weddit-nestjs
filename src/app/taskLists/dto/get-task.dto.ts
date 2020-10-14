export class GetTaskDetailsDto {
	idTaskList: number;

	description: string;

	deadline: Date;

	dutyHolderFullName: string;

	isComplete: boolean;

	cost: number;

	contactPersonFullName: string;

	contactPersonPhone: string;

	contactPersonEmail: string;

	notes: string;
}
