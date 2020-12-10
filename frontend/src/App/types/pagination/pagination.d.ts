export interface IPageQueryParams {
	pageNumber: number;
	pageSize: number;
	totalNumberOfItems?: number;
}

export type ICollectionResponse<T> = {
	data: T[];
	totalNumberOfItems: number;
} & IPageQueryParams;
