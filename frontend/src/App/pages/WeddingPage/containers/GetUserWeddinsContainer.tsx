import { Button, Col, Row } from 'antd';
import ConfiguredTable from 'App/common/components/ConfiguredTable';
import { RootState } from 'App/state/root.reducer';
import { getUserWeddings } from 'App/state/weddings/weddings.thunk';
import React, { CSSProperties } from 'react';
import { useHistory } from 'react-router';
import { renderWeddingTableColumns } from '../utils/WeddingTable';

import '../utils/GetUserWeddingsContainer.less';
import PageTitle from 'App/common/components/PageTitle';
import { ObjectOfStyles } from 'App/types/ObjectOfStyles.type';

const styles: ObjectOfStyles = {
	table: {
		maxWidth: '1000px',
		margin: '1em auto 1.5em'
	},
	menuBar: {
		maxWidth: '1000px',
		margin: ' auto'
	}
};

const GetUserWeddingsContainer: React.FC<{}> = () => {
	const history = useHistory();
	const selectCollection = (state: RootState) => state.weddings.weddings;
	const selectCollectionGetQueryParams = (state: RootState) => state.weddings.getUserWeddingsQueryParams;
	const selectCollectionGetStatus = (state: RootState) => state.weddings.status.getUserWeddings;

	const handleRedirectToCreateWeddingPlanButtonClick = () => {
		history.push('/user/weddings/create');
	};

	return (
		<div id='get-user-weddings-container'>
			<PageTitle title='Twoje wesela' />
			<Row justify='center' align='middle' style={styles.menuBar}>
				<Col xs={12} sm={12} md={8} lg={6}>
					<Button onClick={handleRedirectToCreateWeddingPlanButtonClick}>Utwórz nowy plan</Button>
				</Col>
				<Col xs={12} sm={12} md={8} lg={6}></Col>
				<Col xs={12} sm={12} md={8} lg={6}></Col>
				<Col xs={12} sm={12} md={8} lg={6}></Col>
			</Row>
			<ConfiguredTable
				rowKey='idWedding'
				columnsRenderMethod={renderWeddingTableColumns}
				getCollectionThunkAction={getUserWeddings}
				selectCollection={selectCollection}
				selectCollectionGetQueryParams={selectCollectionGetQueryParams}
				selectCollectionGetStatus={selectCollectionGetStatus}
				style={styles.table}
			/>
		</div>
	);
};

export default GetUserWeddingsContainer;
