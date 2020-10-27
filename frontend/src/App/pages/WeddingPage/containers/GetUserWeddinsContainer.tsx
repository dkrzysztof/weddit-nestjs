import { Button } from 'antd';
import ConfiguredTable from 'App/common/components/ConfiguredTable';
import { RootState } from 'App/state/root.reducer';
import { getUserWeddings } from 'App/state/weddings/weddings.thunk';
import React from 'react';
import { useHistory } from 'react-router';
import { renderWeddingTableColumns } from '../utils/WeddingTable';

const GetUserWeddingsContainer: React.FC<{}> = () => {
	const history = useHistory();
	const selectCollection = (state: RootState) => state.weddings.weddings;
	const selectCollectionGetQueryParams = (state: RootState) => state.weddings.getUserWeddingsQueryParams;
	const selectCollectionGetStatus = (state: RootState) => state.weddings.status.getUserWeddings;

	const handleRedirectToCreateWeddingPlanButtonClick = () => {
		history.push('/user/weddings/create');
	};

	return (
		<>
			<Button onClick={handleRedirectToCreateWeddingPlanButtonClick}>Utwórz nowy plan</Button>
			<ConfiguredTable
				columnsRenderMethod={renderWeddingTableColumns}
				rowKey='idWedding'
				getCollectionThunkAction={getUserWeddings}
				selectCollection={selectCollection}
				selectCollectionGetQueryParams={selectCollectionGetQueryParams}
				selectCollectionGetStatus={selectCollectionGetStatus}
			></ConfiguredTable>
		</>
	);
};

export default GetUserWeddingsContainer;
