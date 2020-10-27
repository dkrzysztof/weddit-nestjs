import { Descriptions, Result } from 'antd';
import Center from 'App/common/components/Center';
import GoToPreviousPageButton from 'App/common/components/handleGoBack';
import LoadingScreen from 'App/common/components/LoadingScreen';
import PageTitle from 'App/common/components/PageTitle';
import { RootState } from 'App/state/root.reducer';
import { getWeddingDetails } from 'App/state/weddings/weddings.thunk';
import StatusType from 'App/types/requestStatus';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router';

interface ViewWeddingRouteParams {
	idWedding: string;
}

const ViewWeddingContainer: React.FC<RouteComponentProps<ViewWeddingRouteParams>> = ({ match }) => {
	const idWedding = Number.parseInt(match.params.idWedding);
	const dispatch = useDispatch();
	const wedding = useSelector((state: RootState) => state.weddings.selectedWedding);
	const getWeddingDetailsStatus = useSelector((state: RootState) => state.weddings.status.getWeddingDetails);

	useEffect(() => {
		dispatch(getWeddingDetails(idWedding));
	}, [dispatch]);

	if (getWeddingDetailsStatus === StatusType.LOADING)
		return (
			<Center size='small'>
				<LoadingScreen container='fill' />
			</Center>
		);

	if (getWeddingDetailsStatus === StatusType.SUCCESS) {
		return (
			<Center size='medium'>
				<GoToPreviousPageButton />
				<PageTitle title={`Dane szczegółowe wesela ${wedding.name}`} />
				<Descriptions bordered>
					<Descriptions.Item label='name'>{wedding.name || <em>brak</em>}</Descriptions.Item>
					<Descriptions.Item label='dateOfWedding'>
						{wedding.dateOfWedding || <em>brak</em>}
					</Descriptions.Item>
					<Descriptions.Item label='hourOfWedding'>
						{wedding.hourOfWedding || <em>brak</em>}
					</Descriptions.Item>
					<Descriptions.Item label='hourOfChurchService'>
						{wedding.hourOfChurchService || <em>brak</em>}
					</Descriptions.Item>
					<Descriptions.Item label='hasAfters'>{wedding.hasAfters || <em>brak</em>}</Descriptions.Item>
					<Descriptions.Item label='address'>{wedding.address || <em>brak</em>}</Descriptions.Item>
					<Descriptions.Item label='tablesTotalCount'>
						{wedding.tablesTotalCount || <em>brak</em>}
					</Descriptions.Item>
					<Descriptions.Item label='tableNumberOfMarried'>
						{wedding.tableNumberOfMarried || <em>brak</em>}
					</Descriptions.Item>
					<Descriptions.Item label='sumCostTask'>{wedding.sumCostTask || <em>brak</em>}</Descriptions.Item>
					<Descriptions.Item label='sumCostDrink'>{wedding.sumCostDrink || <em>brak</em>}</Descriptions.Item>
					<Descriptions.Item label='sumCost'>{wedding.sumCost || <em>brak</em>}</Descriptions.Item>
					<Descriptions.Item label='budget'>{wedding.budget || <em>brak</em>}</Descriptions.Item>
					<Descriptions.Item label='exceedBudget'>{wedding.exceedBudget || <em>brak</em>}</Descriptions.Item>
				</Descriptions>
			</Center>
		);
	} else return <Result status='500' title='500' subTitle='Przykro nam, ale serwer napotkał bład...' />;
};

export default ViewWeddingContainer;
