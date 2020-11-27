import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ErrorApi } from 'App/api/agent';
import { GetTasksResponse } from 'App/api/taskLists/responses/GetAllTasks';
import { GetTaskResponse } from 'App/api/taskLists/responses/GetTask';
import StatusType from 'App/types/requestStatus';
import { initialTaskState, TaskState } from './tasks.state';

const { FAILED, SUCCESS, LOADING, INITIAL } = StatusType;

const tasksSlice = createSlice({
	name: 'tasks',
	initialState: initialTaskState,
	reducers: {
		getTasksStart: (state: TaskState) => {
			state.status.getTasks = LOADING;
		},
		getTasksSuccess: (state: TaskState, action: PayloadAction<GetTasksResponse>) => {
			state.status.getTasks = SUCCESS;
			state.tasks = action.payload;
		},
		getTasksFailure: (state: TaskState, action: PayloadAction<ErrorApi>) => {
			state.status.getTasks = FAILED;
		},

		///

		createTaskStart: (state: TaskState) => {
			state.status.createTask = LOADING;
		},
		createTaskSuccess: (state: TaskState, action: PayloadAction<any>) => {
			state.status.createTask = SUCCESS;
		},
		createTaskFailure: (state: TaskState, action: PayloadAction<ErrorApi>) => {
			state.status.createTask = FAILED;
		},

		///

		updateTaskStart: (state: TaskState) => {
			state.status.updateTask = LOADING;
		},
		updateTaskSuccess: (state: TaskState, action: PayloadAction<any>) => {
			state.status.updateTask = SUCCESS;
		},
		updateTaskFailure: (state: TaskState, action: PayloadAction<ErrorApi>) => {
			state.status.updateTask = FAILED;
		},

		///

		deleteTaskStart: (state: TaskState) => {
			state.status.deleteTask = LOADING;
		},
		deleteTaskSuccess: (state: TaskState, action: PayloadAction<any>) => {
			state.status.deleteTask = SUCCESS;
		},
		deleteTaskFailure: (state: TaskState, action: PayloadAction<ErrorApi>) => {
			state.status.deleteTask = FAILED;
		},

		///

		getTaskDetailsStart: (state: TaskState) => {
			state.status.getTaskDetails = LOADING;
		},
		getTaskDetailsSuccess: (state: TaskState, action: PayloadAction<GetTaskResponse>) => {
			state.status.getTaskDetails = SUCCESS;

			state.selectedTask = action.payload;
			state.selectedTask.deadline = new Date(state.selectedTask.deadline);
		},
		getTaskDetailsFailure: (state: TaskState, action: PayloadAction<ErrorApi>) => {
			state.status.getTaskDetails = FAILED;
		}

		///
	}
});

export const {
	createTaskFailure,
	createTaskStart,
	createTaskSuccess,
	deleteTaskFailure,
	deleteTaskStart,
	deleteTaskSuccess,
	getTaskDetailsFailure,
	getTaskDetailsStart,
	getTaskDetailsSuccess,
	getTasksFailure,
	getTasksStart,
	getTasksSuccess,
	updateTaskFailure,
	updateTaskStart,
	updateTaskSuccess
} = tasksSlice.actions;

export default tasksSlice;
