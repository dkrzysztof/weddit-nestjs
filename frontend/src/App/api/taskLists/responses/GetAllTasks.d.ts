export type GetTasksResponse = TaskForGetTasksResponse[];

export interface TaskForGetTasksResponse {
	idTaskList: number;

	idWedding: number;

	description: string;

	deadline: Date;

	dutyHolderFullName: string;

	isComplete: boolean;

	cost: number;
}
