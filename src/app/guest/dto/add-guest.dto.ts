import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class AddGuestDto {
	@IsOptional()
	idGuest: number;

	@IsNotEmpty()
	@IsString()
	firstName: string;

	@IsNotEmpty()
	@IsString()
	lastName: string;

	@IsOptional()
	confirmed: boolean;

	@IsOptional()
	confirmedAfters: boolean;

	@IsOptional()
	numberTable: number;

	@IsOptional()
	numberSeat: number;

	@IsOptional()
	idGuestType: number;
}
