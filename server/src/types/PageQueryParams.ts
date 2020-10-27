import { IsNotEmpty, IsOptional } from 'class-validator';

export class IPageQueryParams {
	@IsNotEmpty()
	pageSize: number | string;
	@IsNotEmpty()
	pageNumber: number | string;
	@IsOptional()
	totalNumberOfItems?: number | string;
}
