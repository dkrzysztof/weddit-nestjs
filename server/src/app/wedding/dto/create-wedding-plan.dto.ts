import { Type } from 'class-transformer';
import { IsBoolean, IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateWeddingPlanDto {
	@IsNotEmpty()
	@IsString()
	name: string;

	@Type(() => Date)
	@IsDate()
	@IsNotEmpty()
	dateOfWedding: Date;

	@IsOptional()
	hourOfWedding: Date;

	@Type(() => Date)
	@IsDate()
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
	sumCostDrink: number;

	@IsNumber()
	@IsOptional()
	sumCost: number;

	@IsNumber()
	@IsOptional()
	budget: number;

	@IsNumber()
	@IsOptional()
	exceedBudget: number;
}