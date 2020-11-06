import { IsOptional, IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateGuestDto {
	@IsOptional()
	@IsString()
	firstName: string;

	@IsOptional()
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
	@IsNumber()
	idGuestType: number;
}
