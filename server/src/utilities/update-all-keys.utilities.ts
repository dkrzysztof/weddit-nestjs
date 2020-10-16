export const updateAllObjectKeyValues = (objFrom: object, objTo: object) => {
	for (let key of Object.keys(objTo)) {
		if (objFrom[key] != null) {
			objTo[key] = objFrom[key];
		}
	}
};
