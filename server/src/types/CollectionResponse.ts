import { IPageQueryParams } from './PageQueryParams';

export type ICollectionResponse<T> = {
	data: T[];
	totalNumberOfItems: number;
} & IPageQueryParams;
