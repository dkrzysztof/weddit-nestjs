export interface CreateTaskRequest {
	description: string;

	deadline: Date | string;

	dutyHolderFullName: string;

	cost?: number;

	contactPersonFullName?: string;

	contactPersonPhone?: string;

	contactPersonEmail?: string;

	notes?: string;
}
