let res = '';

export function propName(prop: object, value: any): string {
	for (var i in prop) {
		if (typeof prop[i] == 'object') {
			if (propName(prop[i], value)) {
				return res;
			}
		} else {
			if (prop[i] == value) {
				res = i;
				return res;
			}
		}
	}
	return undefined;
}
