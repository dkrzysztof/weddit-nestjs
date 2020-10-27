import { GetUserWeddings } from 'App/api/weddings/requests';
import { WeddingForGetUserWeddings } from 'App/api/weddings/requests/getUserWeddingsResponse';
import { GetWeddingDetailsResponse } from 'App/api/weddings/responses';
import defaultPageQueryParams from 'App/common/utils/defaultPageQueryParams';
import { IPageQueryParams } from 'App/types/pagination/pagination';
import StatusType from 'App/types/requestStatus';

const { INITIAL } = StatusType;

export interface WeddingsState {
	status: {
		getUserWeddings: StatusType;
		getWeddingDetails: StatusType;
		createWedding: StatusType;
	};
	getUserWeddingsQueryParams: IPageQueryParams;
	weddings: WeddingForGetUserWeddings[];
	selectedWedding: GetWeddingDetailsResponse | null;
}

export const weddingInitialState: WeddingsState = {
	status: {
		createWedding: INITIAL,
		getUserWeddings: INITIAL,
		getWeddingDetails: INITIAL
	},
	selectedWedding: null,
	weddings: null,
	getUserWeddingsQueryParams: defaultPageQueryParams
};
