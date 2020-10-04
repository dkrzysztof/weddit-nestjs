import { IsEmail, IsNotEmpty, IsString, MinLength, Validate } from 'class-validator';
import { UniqueEmail } from './validators/UniqueEmail';

export class CreateUserDto {
	@IsNotEmpty()
	firstName: string;

	@IsNotEmpty()
	lastName: string;

	@IsEmail()
	@Validate(UniqueEmail)
	email: string;

	@MinLength(6)
	@IsString()
	password: string;
}
