import { BeverageForGetBeveragesResponse } from 'App/api/beverages/responses/GetAllBeveragesResponse';
import defaultPageQueryParams from 'App/common/utils/defaultPageQueryParams';
import { IPageQueryParams } from 'App/types/pagination/pagination';
import StatusType from 'App/types/requestStatus';

export interface BeveragesState {
	status: {
		getBeverages: StatusType;
		createBeverage: StatusType;
		deleteBeverage: StatusType;
		updateBeverage: StatusType;
	};
	beverages: BeverageForGetBeveragesResponse[];
	queryParams: IPageQueryParams;
	error: any;
}

export const initialBeveragesState: BeveragesState = {
	status: {
		createBeverage: StatusType.INITIAL,
		deleteBeverage: StatusType.INITIAL,
		getBeverages: StatusType.INITIAL,
		updateBeverage: StatusType.INITIAL
	},
	beverages: null,
	queryParams: defaultPageQueryParams,
	error: null
};
