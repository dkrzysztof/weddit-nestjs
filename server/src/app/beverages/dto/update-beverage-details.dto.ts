import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';

export class UpdateBeverageDetailsDto {
	@IsOptional()
	@IsString()
	name: string;

	@IsNumber()
	@IsOptional()
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
