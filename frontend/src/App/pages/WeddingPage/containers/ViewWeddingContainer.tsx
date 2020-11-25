import {
	BarsOutlined,
	ExperimentOutlined,
	PartitionOutlined,
	SettingFilled,
	SettingOutlined,
	SettingTwoTone,
	TeamOutlined
} from '@ant-design/icons';
import { Button, Card, Col, Descriptions, Divider, Dropdown, Result, Row, Typography } from 'antd';
import { WeddingForGetUserWeddings } from 'App/api/weddings/requests/GetUserWeddingsRequest';
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
import { Link } from 'react-router-dom';
import '../styles/ViewWeddingContainer.less';

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
				<Row justify='center'>
					<Col xs={22} sm={22} md={20} lg={16}>
						<Row justify='space-between'>
							<Col span={23}>
								<PageTitle title={`Dane szczegółowe wesela ${wedding.name}`} />
							</Col>
							<Col span={1}>
								<Link to={`/weddings/${idWedding}/update`}>
									<Button type='link' style={{ color: '#5923ef' }}>
										<SettingOutlined />
									</Button>
								</Link>
							</Col>
						</Row>
					</Col>
				</Row>
				<Row justify='center'>
					<Col xs={22} sm={22} md={20} lg={16}>
						<Descriptions
							bordered
							column={{ xxl: 4, xl: 3, lg: 2, md: 2, sm: 2, xs: 1 }}
							style={styles.description}
						>
							<Descriptions.Item label='Nazwa wesela'>{wedding.name || <em>-</em>}</Descriptions.Item>
							<Descriptions.Item label='Data ślubu'>
								{wedding.dateOfWedding || <em>--</em>}
							</Descriptions.Item>
							<Descriptions.Item label='Godzina rozpoczęcia'>
								{wedding.hourOfWedding || <em>--</em>}
							</Descriptions.Item>
							<Descriptions.Item label='Godzina mszy świętej'>
								{wedding.hourOfChurchService || <em>--</em>}
							</Descriptions.Item>
							<Descriptions.Item label='Czy będą poprawiny?'>
								{wedding.hasAfters ? 'Tak' : <em>--</em>}
							</Descriptions.Item>
							<Descriptions.Item label='Adres sali weselnej'>
								{wedding.address || <em>--</em>}
							</Descriptions.Item>
							<Descriptions.Item label='Liczba stolików na sali'>
								{wedding.tablesTotalCount || <em>--</em>}
							</Descriptions.Item>
							<Descriptions.Item label='Numer Stolika Pary młodej'>
								{wedding.tableNumberOfMarried || <em>--</em>}
							</Descriptions.Item>
							<Descriptions.Item label='Koszt usług'>
								{wedding.sumCostTask ? `${wedding.sumCostTask} zł` : <em>--</em>}
							</Descriptions.Item>
							<Descriptions.Item label='Koszt napojów'>
								{wedding.sumCostBeverages ? `${wedding.sumCostBeverages} zł` : <em>--</em>}
							</Descriptions.Item>
							<Descriptions.Item label='Suma Kosztów'>
								{wedding.sumCost ? `${wedding.sumCost} zł` : <em>--</em>}
							</Descriptions.Item>
							<Descriptions.Item label='Budżet'>
								<Typography.Text strong style={{ color: wedding.budget > 0 && '#4ad453' }}>
									{wedding.budget > 0 ? `${wedding.budget} zł` : <em>0 zł</em>}
								</Typography.Text>
							</Descriptions.Item>
							<Descriptions.Item label='Przekroczony budżet'>
								<Typography.Text strong style={{ color: '#e35252' }}>
									{wedding.exceedBudget ? `${wedding.exceedBudget} zł` : <em>-</em>}
								</Typography.Text>
							</Descriptions.Item>
						</Descriptions>
						<Divider>Akcje</Divider>
						<Row justify='space-between'>
							<Col xs={24} sm={24} md={11} lg={5}>
								<ConfiguredCard
									onClick={() => history.push(`/weddings/${idWedding}/guests`)}
									className='ant-card-hover guests'
								>
									<TeamOutlined
										style={{
											color: '#4d4dff',
											fontSize: '2em',
											marginRight: '0.5em'
										}}
									/>{' '}
									Lista Gości
								</ConfiguredCard>
							</Col>
							<Col xs={24} sm={24} md={11} lg={5}>
								<ConfiguredCard
									onClick={() => history.push(`/weddings/${idWedding}/beverages`)}
									className='ant-card-hover beverages'
								>
									<ExperimentOutlined
										style={{
											color: '#ffc14d',
											fontSize: '2em',
											marginRight: '0.5em'
										}}
									/>
									Napoje na weselu
								</ConfiguredCard>
							</Col>
							<Col xs={24} sm={24} md={11} lg={5}>
								<ConfiguredCard
									onClick={() => history.push(`/weddings/${idWedding}/task-list`)}
									className='ant-card-hover task-list'
								>
									<BarsOutlined
										style={{
											color: '#58b368',
											fontSize: '2em',
											marginRight: '0.5em'
										}}
									/>
									Lista zadań
								</ConfiguredCard>
							</Col>
							<Col xs={24} sm={24} md={11} lg={5}>
								<ConfiguredCard
									onClick={() => history.push(`/weddings/${idWedding}/seat-chart`)}
									className='ant-card-hover seat-chart'
								>
									<PartitionOutlined
										style={{
											color: '#a862ea',
											fontSize: '2em',
											marginRight: '0.5em'
										}}
									/>
									Rozstawienie gości
								</ConfiguredCard>
							</Col>
						</Row>
					</Col>
				</Row>
			</>
		);
	} else return <Result status='500' title='500' subTitle='Przykro nam, ale serwer napotkał bład...' />;
};

export default ViewWeddingContainer;
