export const getTimeString = (datetimeObject: Date): string => {
	return `${datetimeObject.getHours()}:${datetimeObject.getMinutes()}:${datetimeObject.getSeconds()}`;
};
