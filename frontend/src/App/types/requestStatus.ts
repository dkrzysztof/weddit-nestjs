export enum StatusType {
	INITIAL,
	LOADING,
	SUCCESS,
	FAILED
}

export function isStatusSuccess(status: StatusType) {
	return status === StatusType.SUCCESS;
}

export function isStatusFailed(status: StatusType) {
	return status === StatusType.FAILED;
}

export function isStatusLoading(status: StatusType) {
	return status === StatusType.LOADING;
}

export default StatusType;
