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
	@IsNotEmpty()
	consumingFactor: number;

	@IsNumber()
	@IsNotEmpty()
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
	@IsNotEmpty()
	price: number;
}
