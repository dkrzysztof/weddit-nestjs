import { IsBoolean, IsDateString, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateTaskDetailsDto {
	@IsString()
	@IsOptional()
	description: string;

	@IsOptional()
	@IsDateString()
	deadline: Date;

	@IsString()
	@IsOptional()
	dutyHolderFullName: string;

	@IsBoolean()
	@IsOptional()
	isComplete: boolean;

	@IsNumber()
	@IsOptional()
	cost: number;

	@IsString()
	@IsOptional()
	contactPersonFullName: string;

	@IsString()
	@IsOptional()
	contactPersonPhone: string;

	@IsString()
	@IsOptional()
	contactPersonEmail: string;

	@IsString()
	@IsOptional()
	notes: string;
}
