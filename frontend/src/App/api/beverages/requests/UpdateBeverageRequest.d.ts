export interface UpdateBeverageRequest {
	name?: string;

	bottleCapacity?: number;

	consumingFactor?: number;

	consumersCount?: number;

	neededAmount?: number;

	boughtAmount?: number;

	remainingAmount?: number;

	price?: number;
}
