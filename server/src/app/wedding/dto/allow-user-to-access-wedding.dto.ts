import { IsNotEmpty, IsEmail, IsBoolean } from 'class-validator';

export class AllowUserToAccessWedding {
	@IsNotEmpty()
	@IsEmail()
	userEmail: string;

	@IsNotEmpty()
	@IsBoolean()
	canEdit: boolean;
}
