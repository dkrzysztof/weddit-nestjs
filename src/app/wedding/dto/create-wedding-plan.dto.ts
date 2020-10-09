import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateWeddingPlan {
	@IsNotEmpty()
	@IsString()
	name: string;

	@IsString()
	dateOfWedding: string;

	@IsString()
	hourOfWedding: string;

	@IsString()
	hourOfChurchService: string;

	@IsBoolean()
	hasAfters: boolean;

	@IsString()
	address: string;

	@IsNumber()
	tablesTotalCount: number;

	@IsNumber()
	tableNumberOfMarried: number;

	@IsNumber()
	sumCostTask: number;

	@IsNumber()
	sumCostDrink: number;

	@IsNumber()
	sumCost: number;

	@IsNumber()
	budget: number;

	@IsNumber()
	exceedBudget: number;
}
