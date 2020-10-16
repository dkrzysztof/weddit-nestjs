export interface CreateUserResponse {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
	emailConfirmed: boolean;
	isDeleted: boolean;
	lockoutEnabled: boolean;
	lockoutEnd: string;
	accessFailedCount: number;
	phoneNumber: string | null;
	phoneNumberConfirmed: boolean;
	twoFactorEnabled: boolean;
	userName: string;
	roles: Role[];
}
