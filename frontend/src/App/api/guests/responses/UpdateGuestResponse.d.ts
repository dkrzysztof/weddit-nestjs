export interface UpdateGuestResponse {
	idGuestType: number;
	idGuest: number;
	firstName: string;
	lastName: string;
	confirmed: boolean;
	confirmedAfters: boolean;
	numberTable: number;
	numberSeat: number;
	guestType: {
		idGuestType: number;
		name: string;
	};
}
