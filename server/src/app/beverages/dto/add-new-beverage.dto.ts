import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Column } from 'typeorm';

export class AddNewBeverageDto {
	@IsNotEmpty()
	@IsString()
	name: string;

	@IsNumber()
	@IsNotEmpty()
	bottleCapacity: number;

	@IsNumber()
	@IsOptional()
	consumingFactor: number;

	@IsNumber()
	@IsOptional()
	consumersCount: number;

	@IsNumber()
	@IsOptional()
	neededAmount: number;

	@IsNumber()
	@IsOptional()
	boughtAmount: number;

	@IsNumber()
	@IsOptional()
	remainingAmount: number;

	@IsNumber()
	@IsOptional()
	price: number;
}
