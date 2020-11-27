export interface GuestForSeatChartModel {
	idGuest: number;
	name: string;
	key: number;
	loc: string;
	table: number;
	seat: number;
}

export interface TableForSeatChartModel {
	key: number;
	category: string;
	name: string;
	guests: {
		[key: string]: number;
	};
	loc: string;
	angle: number;
}
