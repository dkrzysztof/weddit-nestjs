import { IPageQueryParams } from 'src/types/PageQueryParams';

export type GetEntites = (skip: number, take: number) => Promise<any[]>;
export type GetTotalNumberOfItems = () => Promise<number>;

export async function getCollection(
	query: IPageQueryParams,
	getEntites: GetEntites,
	getTotalNumberOfItems: GetTotalNumberOfItems,
) {
	let pageNumber = Number.parseInt(query.pageNumber.toString());
	if (pageNumber <= 0) pageNumber = 1;

	let pageSize = Number.parseInt(query.pageSize.toString());
	if (pageSize <= 0) pageSize = 10;

	const skip = (pageNumber - 1) * pageSize;
	const take = pageSize;
	const data = await getEntites(skip, take);
	const totalNumberOfItems = await getTotalNumberOfItems();
	return {
		data,
		totalNumberOfItems,
		pageNumber,
		pageSize,
	};
}
