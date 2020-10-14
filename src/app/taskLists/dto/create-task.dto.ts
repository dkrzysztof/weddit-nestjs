import { Expose, Type } from 'class-transformer';
import { IsDate, IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateTaskDto {
	@IsString()
	@IsNotEmpty()
	description: string;

	@Type(() => Date)
	@IsDate()
	@IsNotEmpty()
	deadline: Date;

	@IsString()
	@IsNotEmpty()
	dutyHolderFullName: string;

	@IsNumber()
	cost: number;

	@IsOptional()
	@IsString()
	contactPersonFullName: string;

	@IsOptional()
	@IsString()
	contactPersonPhone: string;

	@IsOptional()
	@IsString()
	contactPersonEmail: string;

	@IsOptional()
	@IsString()
	notes: string;
}
