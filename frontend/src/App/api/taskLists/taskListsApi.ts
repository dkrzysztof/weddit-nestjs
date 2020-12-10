import { requests } from '../agent';
import { CreateTaskRequest } from './requests/CreateTaskRequest';
import { UpdateTaskRequest } from './requests/UpdateTaskRequest';
import { GetTasksResponse } from './responses/GetAllTasks';
import { GetTaskResponse } from './responses/GetTask';

export const TaskListApi = {
	getTasks: (idWedding: number): Promise<GetTasksResponse> => requests.get(`/weddings/${idWedding}/task-lists`),
	getTask: (idWedding: number, idTaskList: number): Promise<GetTaskResponse> =>
		requests.get(`/weddings/${idWedding}/task-lists/${idTaskList}`),
	createTask: (idWedding: number, body: CreateTaskRequest): Promise<any> =>
		requests.post(`/weddings/${idWedding}/task-lists`, body),
	updateTask: (idWedding: number, idTaskList: number, body: UpdateTaskRequest): Promise<any> =>
		requests.put(`/weddings/${idWedding}/task-lists/${idTaskList}`, body),
	deleteTask: (idWedding: number, idTaskList: number): Promise<boolean> =>
		requests.delete(`/weddings/${idWedding}/task-lists/${idTaskList}`)
};
