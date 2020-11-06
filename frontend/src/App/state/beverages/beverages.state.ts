import { GetBeveragesResponse } from 'App/api/beverages/responses';
import StatusType from 'App/types/requestStatus';

export interface BeveragesState {
	status: {
		getBeverages: StatusType;
		createBeverage: StatusType;
		deleteBeverage: StatusType;
		updateBeverage: StatusType;
	};
	beverages: GetBeveragesResponse;
}

export const initialBeveragesState: BeveragesState = {
	status: {
		createBeverage: StatusType.INITIAL,
		deleteBeverage: StatusType.INITIAL,
		getBeverages: StatusType.INITIAL,
		updateBeverage: StatusType.INITIAL
	},
	beverages: null
};
