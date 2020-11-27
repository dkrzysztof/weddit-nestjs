export interface GetWeddingDetailsResponse {
	name: string;

	dateOfWedding: Date;

	hourOfWedding: Date;

	hourOfChurchService: Date;

	hasAfters: boolean;

	address: string;

	tablesTotalCount: number;

	tableNumberOfMarried: number;

	sumCostTask: number;

	sumCostBeverage: number;

	sumCost: number;

	budget: number;

	exceedBudget: number;

	seatChart: string | null;
}
