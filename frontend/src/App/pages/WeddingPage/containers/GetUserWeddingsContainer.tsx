import { Button, Col, notification, Row } from 'antd';
import ConfiguredTable from 'App/common/components/ConfiguredTable';
import PageTitle from 'App/common/components/PageTitle';
import { RootState } from 'App/state/root.reducer';
import { deselectWedding } from 'App/state/weddings/weddings.slice';
import { getUserWeddings } from 'App/state/weddings/weddings.thunk';
import { ObjectOfStyles } from 'App/types/ObjectOfStyles.type';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import '../utils/GetUserWeddingsContainer.less';
import { renderWeddingTableColumns } from '../utils/WeddingTable';

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
	const dispatch = useDispatch();
	const selectCollection = (state: RootState) => state.weddings.weddings;
	const selectCollectionGetQueryParams = (state: RootState) => state.weddings.getUserWeddingsQueryParams;
	const selectCollectionGetStatus = (state: RootState) => state.weddings.status.getUserWeddings;

	const handleRedirectToCreateWeddingPlanButtonClick = () => {
		history.push('/weddings/create');
	};

	const handle = (pagination) => {
		return getUserWeddings(pagination);
	};

	notification.destroy();

	useEffect(() => {
		dispatch(deselectWedding());
	}, [dispatch]);

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
				getCollectionThunkAction={handle}
				selectCollection={selectCollection}
				selectCollectionGetQueryParams={selectCollectionGetQueryParams}
				selectCollectionGetStatus={selectCollectionGetStatus}
				style={styles.table}
			/>
		</div>
	);
};

export default GetUserWeddingsContainer;
