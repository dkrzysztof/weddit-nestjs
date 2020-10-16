export const appendOrCreateArray = (obj: object, property: string, valueToAppend: any) => {
	if (obj[property] && obj[property].length > 0) {
		obj[property].push(valueToAppend);
	} else {
		obj[property] = [valueToAppend];
	}
};
