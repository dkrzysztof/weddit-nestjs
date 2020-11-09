import { Type } from 'class-transformer';
import { IsOptional, IsString, IsDate, IsNotEmpty, IsBoolean, IsNumber } from 'class-validator';

export class UpdateWeddingDto {
	@IsOptional()
	@IsString()
	name: string;

	@Type(() => Date)
	@IsDate()
	@IsOptional()
	dateOfWedding: Date;

	@IsOptional()
	hourOfWedding: Date;

	@IsOptional()
	hourOfChurchService: Date;

	@IsBoolean()
	@IsOptional()
	hasAfters: boolean;

	@IsString()
	@IsOptional()
	address: string;

	@IsNumber()
	@IsOptional()
	tablesTotalCount: number;

	@IsNumber()
	@IsOptional()
	tableNumberOfMarried: number;

	@IsNumber()
	@IsOptional()
	sumCostTask: number;

	@IsNumber()
	@IsOptional()
	sumCostBeverage: number;

	@IsNumber()
	@IsOptional()
	sumCost: number;

	@IsNumber({ maxDecimalPlaces: 2 })
	@IsOptional()
	budget: number;

	@IsNumber()
	@IsOptional()
	exceedBudget: number;
}
