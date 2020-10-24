export interface JwtPayload {
	idUser: number;
	email: string;
	isAdmin?: boolean;
}
