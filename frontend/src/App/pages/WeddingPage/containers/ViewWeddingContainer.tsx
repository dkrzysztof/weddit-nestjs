import { Card, Col, Descriptions, Divider, Result, Row } from 'antd';
import Center from 'App/common/components/Center';
import ConfiguredCard from 'App/common/components/ConfiguredCard';
import GoToPreviousPageButton from 'App/common/components/handleGoBack';
import LoadingScreen from 'App/common/components/LoadingScreen';
import PageTitle from 'App/common/components/PageTitle';
import { RootState } from 'App/state/root.reducer';
import { getWeddingDetails } from 'App/state/weddings/weddings.thunk';
import { ObjectOfStyles } from 'App/types/ObjectOfStyles.type';
import StatusType from 'App/types/requestStatus';
import React, { CSSProperties, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router';

interface ViewWeddingRouteParams {
	idWedding: string;
}

const styles: ObjectOfStyles = {
	description: {
		marginBottom: '1em'
	}
};

const ViewWeddingContainer: React.FC<RouteComponentProps<ViewWeddingRouteParams>> = ({ match, history }) => {
	const idWedding = Number.parseInt(match.params.idWedding);
	const dispatch = useDispatch();
	const wedding = useSelector((state: RootState) => state.weddings.selectedWedding);
	const getWeddingDetailsStatus = useSelector((state: RootState) => state.weddings.status.getWedding);

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
			<>
				<GoToPreviousPageButton />
				<PageTitle title={`Dane szczegółowe wesela ${wedding.name}`} />
				<Row justify='center'>
					<Col xs={22} sm={22} md={20} lg={16}>
						<Descriptions
							bordered
							column={{ xxl: 4, xl: 3, lg: 2, md: 2, sm: 2, xs: 1 }}
							style={styles.description}
						>
							<Descriptions.Item label='Nazwa wesela'>{wedding.name || <em>-</em>}</Descriptions.Item>
							<Descriptions.Item label='Data ślubu'>
								{wedding.dateOfWedding || <em>-</em>}
							</Descriptions.Item>
							<Descriptions.Item label='Godzina rozpoczęcia'>
								{wedding.hourOfWedding || <em>-</em>}
							</Descriptions.Item>
							<Descriptions.Item label='Godzina mszy świętej'>
								{wedding.hourOfChurchService || <em>-</em>}
							</Descriptions.Item>
							<Descriptions.Item label='Czy będą poprawiny?'>
								{wedding.hasAfters ? 'Tak' : <em>-</em>}
							</Descriptions.Item>
							<Descriptions.Item label='Adres sali weselnej'>
								{wedding.address || <em>-</em>}
							</Descriptions.Item>
							<Descriptions.Item label='Liczba stolików na sali'>
								{wedding.tablesTotalCount || <em>-</em>}
							</Descriptions.Item>
							<Descriptions.Item label='Numer Stolika Pary młodej'>
								{wedding.tableNumberOfMarried || <em>-</em>}
							</Descriptions.Item>
							<Descriptions.Item label='Koszt usług'>
								{wedding.sumCostTask || <em>-</em>}
							</Descriptions.Item>
							<Descriptions.Item label='Koszt napojów'>
								{wedding.sumCostBeverages || <em>-</em>}
							</Descriptions.Item>
							<Descriptions.Item label='Suma Kosztów'>{wedding.sumCost || <em>-</em>}</Descriptions.Item>
							<Descriptions.Item label='Budżet'>{wedding.budget || <em>-</em>}</Descriptions.Item>
							<Descriptions.Item label='Przkroczony budżet'>
								{wedding.exceedBudget || <em>-</em>}
							</Descriptions.Item>
						</Descriptions>
						<Divider>Akcje</Divider>
						<Row justify='space-between'>
							<Col xs={24} sm={24} md={11} lg={5}>
								<ConfiguredCard onClick={() => history.push(`/weddings/${idWedding}/guests`)}>
									Lista Gości
								</ConfiguredCard>
							</Col>
							<Col xs={24} sm={24} md={11} lg={5}>
								<ConfiguredCard>Napoje na weselu</ConfiguredCard>
							</Col>
							<Col xs={24} sm={24} md={11} lg={5}>
								<ConfiguredCard onClick={() => history.push(`/weddings/${idWedding}/task-list`)}>
									Lista zadań
								</ConfiguredCard>
							</Col>
							<Col xs={24} sm={24} md={11} lg={5}>
								<ConfiguredCard>Rozstawienie gości</ConfiguredCard>
							</Col>
						</Row>
					</Col>
				</Row>
			</>
		);
	} else return <Result status='500' title='500' subTitle='Przykro nam, ale serwer napotkał bład...' />;
};

export default ViewWeddingContainer;
