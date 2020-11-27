import { GetTasksResponse } from 'App/api/taskLists/responses/GetAllTasks';
import { GetTaskResponse } from 'App/api/taskLists/responses/GetTask';
import StatusType from 'App/types/requestStatus';

export interface TaskState {
	status: {
		getTasks: StatusType;
		deleteTask: StatusType;
		createTask: StatusType;
		updateTask: StatusType;
		getTaskDetails: StatusType;
	};
	tasks: GetTasksResponse;
	selectedTask: GetTaskResponse;
	error: any;
}

export const initialTaskState: TaskState = {
	status: {
		createTask: StatusType.INITIAL,
		deleteTask: StatusType.INITIAL,
		getTaskDetails: StatusType.INITIAL,
		getTasks: StatusType.INITIAL,
		updateTask: StatusType.INITIAL
	},
	selectedTask: null,
	tasks: null,
	error: null
};
