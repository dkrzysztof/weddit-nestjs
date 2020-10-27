export interface CreateWeddingPlanRequest {
	name: string;
	dateOfWedding: Date;
	hourOfWedding?: Date;
	hourOfChurchService?: Date;
	hasAfters?: boolean;
	address?: string;
	tablesTotalCount?: number;
	budget?: number;
}
