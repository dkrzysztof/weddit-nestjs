import agent from 'App/api/agent';
import { CreateTaskRequest } from 'App/api/taskLists/requests/CreateTaskRequest';
import { UpdateTaskRequest } from 'App/api/taskLists/requests/UpdateTaskRequest';
import { AppThunk } from '../store';
import {
	getTasksStart,
	getTasksSuccess,
	getTasksFailure,
	createTaskFailure,
	createTaskStart,
	createTaskSuccess,
	updateTaskFailure,
	updateTaskStart,
	updateTaskSuccess,
	deleteTaskFailure,
	deleteTaskStart,
	deleteTaskSuccess,
	getTaskDetailsFailure,
	getTaskDetailsStart,
	getTaskDetailsSuccess
} from './tasks.slice';

export const getTasks = (idWedding: number, onSuccess?: () => void): AppThunk => async (dispatch) => {
	dispatch(getTasksStart());
	agent.TaskList.getTasks(idWedding)
		.then((res) => {
			dispatch(getTasksSuccess(res));
			if (onSuccess) onSuccess();
		})
		.catch((err) => {
			dispatch(getTasksFailure(err));
		});
};

export const createTask = (idWedding: number, body: CreateTaskRequest, onSuccess?: () => void): AppThunk => async (
	dispatch
) => {
	dispatch(createTaskStart());
	agent.TaskList.createTask(idWedding, body)
		.then((res) => {
			dispatch(createTaskSuccess(res));
			onSuccess();
		})
		.catch((err) => dispatch(createTaskFailure(err)));
};

export const updateTask = (
	idWedding: number,
	idTaskList: number,
	body: UpdateTaskRequest,
	onSuccess?: () => void
): AppThunk => async (dispatch) => {
	dispatch(updateTaskStart());
	agent.TaskList.updateTask(idWedding, idTaskList, body)
		.then((res) => {
			setTimeout(() => {
				dispatch(updateTaskSuccess(res));
				onSuccess();
			}, 1000);
		})
		.catch((err) => dispatch(updateTaskFailure(err)));
};

export const deleteTask = (idWedding: number, idTask: number, onSuccess?: () => void): AppThunk => async (dispatch) => {
	dispatch(deleteTaskStart());
	agent.TaskList.deleteTask(idWedding, idTask)
		.then((res) => {
			dispatch(deleteTaskSuccess(res));
			onSuccess();
		})
		.catch((err) => dispatch(deleteTaskFailure(err)));
};

export const getTaskDetails = (idWedding: number, idTask: number, onSuccess?: () => void): AppThunk => async (
	dispatch
) => {
	dispatch(getTaskDetailsStart());
	agent.TaskList.getTask(idWedding, idTask)
		.then((res) => {
			dispatch(getTaskDetailsSuccess(res));
			onSuccess();
		})
		.catch((err) => dispatch(getTaskDetailsFailure(err)));
};
