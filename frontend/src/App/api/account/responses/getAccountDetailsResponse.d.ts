export interface GetAccountDetailsResponse {
	id: string;
	phoneNumber: string;
	phoneNumberConfirmed: string;
	email: string;
	emailConfirmed: string;
	firstName: string;
	lastName: string;
	lockoutEnabled: string;
	lockoutEndDateUtc: null | string;
	birthDate: null;
	roles: Role[];
}
