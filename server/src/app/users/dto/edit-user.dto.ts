export interface EditUserDto {
	idUser: number;
	firstName: string;
	lastName: string;
	isAdmin?: boolean;
	email?: string;
}
