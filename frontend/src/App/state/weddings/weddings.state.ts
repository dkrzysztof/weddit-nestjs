import { GetUserWeddings } from 'App/api/weddings/requests';
import { WeddingForGetUserWeddings } from 'App/api/weddings/requests/GetUserWeddingsRequest';
import { GetUsersWithAccessToWeddingResponse, GetWeddingDetailsResponse } from 'App/api/weddings/responses';
import defaultPageQueryParams from 'App/common/utils/defaultPageQueryParams';
import { IPageQueryParams } from 'App/types/pagination/pagination';
import StatusType from 'App/types/requestStatus';

const { INITIAL } = StatusType;

export interface WeddingsState {
	status: {
		getWedding: StatusType;
		createWedding: StatusType;
		deleteWedding: StatusType;
		updateWedding: StatusType;
		getUserWeddings: StatusType;
		updateUserAccessToWedding: StatusType;
		removeUserAccessToWedding: StatusType;
		getUsersWithAccessToWedding: StatusType;
		addSeatChart: StatusType;
	};
	notify: boolean;
	getUserWeddingsQueryParams: IPageQueryParams;
	weddings: WeddingForGetUserWeddings[] | null;
	selectedWedding: GetWeddingDetailsResponse | null;
	getUsersWithAccessToWedding: GetUsersWithAccessToWeddingResponse[] | null;
}

export const weddingInitialState: WeddingsState = {
	status: {
		createWedding: INITIAL,
		getWedding: INITIAL,
		deleteWedding: INITIAL,
		updateWedding: INITIAL,
		getUserWeddings: INITIAL,
		removeUserAccessToWedding: INITIAL,
		updateUserAccessToWedding: INITIAL,
		getUsersWithAccessToWedding: INITIAL,
		addSeatChart: INITIAL
	},
	notify: true,
	selectedWedding: null,
	getUsersWithAccessToWedding: null,
	weddings: null,
	getUserWeddingsQueryParams: defaultPageQueryParams
};
