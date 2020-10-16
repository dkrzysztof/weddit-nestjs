import { Connection } from 'typeorm';
import { TaskList } from '../../models/taskList.entity';

export const taskListsProvider = [
	{
		provide: 'TASK_LIST_PROVIDER',
		useFactory: (connection: Connection) => connection.getRepository(TaskList),
		inject: ['DATABASE_CONNECTION'],
	},
];
