export interface UpdateWeddingDetailsRequest {
	name: string;
	dateOfWedding: Date;
	hourOfWedding: Date;
	hourOfChurchService: Date;
	hasAfters: boolean;
	address: string;
	tablesTotalCount: number;
	tableNumberOfMarried: number;
	sumCostTask: number;
	sumCostDrink: number;
	sumCost: number;
	budget: number;
	exceedBudget: number;
}
