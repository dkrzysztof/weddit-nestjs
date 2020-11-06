export interface CreateGuestRequest {
	firstName: string;
	lastName: string;
	confirmed: boolean;
	confirmedAfters: boolean;
	numberTable?: number;
	numberSeat?: number;
	idGuestType?: number;
}
