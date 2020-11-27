export interface UpdateTaskRequest {
	description: string;

	deadline?: Moment | string;

	dutyHolderFullName?: string;

	isComplete?: boolean;

	cost?: number;

	contactPersonFullName?: string;

	contactPersonPhone?: string;

	contactPersonEmail?: string;

	notes?: string;
}
