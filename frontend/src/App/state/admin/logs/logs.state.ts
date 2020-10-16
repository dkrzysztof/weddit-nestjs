import { LogForGetLogsFilesResponse } from 'App/api/logs/responses';
import { StatusType } from 'App/types/requestStatus';

const { INITIAL } = StatusType;

export interface AdminLogsState {
	status: {
		getLogsFiles: StatusType;
		getLogsFileContent: StatusType;
		downloadLogsFile: StatusType;
		downloadAllLogsFiles: StatusType;
	};
	error: string[];
	logs: LogForGetLogsFilesResponse[];
	logContent: string[];
}

export const adminLogsInitialState: AdminLogsState = {
	status: {
		getLogsFiles: INITIAL,
		getLogsFileContent: INITIAL,
		downloadLogsFile: INITIAL,
		downloadAllLogsFiles: INITIAL
	},
	error: null,
	logs: [],
	logContent: []
};
