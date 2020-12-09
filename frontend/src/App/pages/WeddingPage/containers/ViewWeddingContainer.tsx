import { BarsOutlined, ExperimentOutlined, PartitionOutlined, SettingOutlined, TeamOutlined } from '@ant-design/icons';
import { Button, Card, Col, Descriptions, Divider, Dropdown, notification, Result, Row, Typography } from 'antd';
import { WeddingForGetUserWeddings } from 'App/api/weddings/requests/GetUserWeddingsRequest';
import Center from 'App/common/components/Center';
import ConfiguredCard from 'App/common/components/ConfiguredCard';
import GoToPreviousPageButton from 'App/common/components/handleGoBack';
import LoadingScreen from 'App/common/components/LoadingScreen';
import PageTitle from 'App/common/components/PageTitle';
import { RootState } from 'App/state/root.reducer';
import { getTasks } from 'App/state/tasks/tasks.thunk';
import { deselectWedding, userWasNotified } from 'App/state/weddings/weddings.slice';
import { getWeddingDetails } from 'App/state/weddings/weddings.thunk';
import { ObjectOfStyles } from 'App/types/ObjectOfStyles.type';
import StatusType, { isStatusLoading, isStatusSuccess } from 'App/types/requestStatus';
import moment from 'moment';
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
	const tasks = useSelector((state: RootState) => state.tasks.tasks);
	const tasksStatus = useSelector((state: RootState) => state.tasks.status.getTasks);
	const shouldNotifyUser = useSelector((state: RootState) => state.weddings.notify);

	useEffect(() => {
		dispatch(getWeddingDetails(idWedding, () => dispatch(getTasks(idWedding))));
	}, [dispatch, idWedding]);

	useEffect(() => {
		if (shouldNotifyUser && isStatusSuccess(tasksStatus) && tasks && tasks.some((t) => t.idWedding === idWedding)) {
			let inSevenDays = moment().add(1, 'week').startOf('day');
			let outdatted = [];
			let isDue = [];

			tasks.forEach((x) => {
				let date = moment(x.deadline);

				if (date.isValid() && date.isBefore(moment().startOf('day')) && !x.isComplete) {
					outdatted.push(`[${date.format('DD.MM.YYYY')}]: ${x.description}`);

					console.log('is Outdated');
				} else if (date.isValid() && date.isBefore(inSevenDays, 'days') && !x.isComplete) {
					isDue.push(`[${date.format('DD.MM.YYYY')}]: ${x.description}`);
				}
			});

			if (outdatted.length > 0) {
				notification.error({
					message: 'Termin zadań minął!',
					description: (
						<div>
							Czas na realizacje poniższych zadań minął:
							<Typography.Text strong style={{ whiteSpace: 'break-spaces' }}>
								{`\n${outdatted.join('\n')}`}
							</Typography.Text>
						</div>
					),
					style: { border: 'solid 2px #f75b57', borderRadius: '0.25rem', backgroundColor: '#fff5f5' },
					duration: 8
				});
			}

			if (isDue.length > 0) {
				notification.warn({
					message: 'Zbliża się termin realizacji zadania!',
					description: (
						<div>
							Czas na realizacje poniższych niedługo się skończy:
							<Typography.Text strong style={{ whiteSpace: 'break-spaces' }}>
								{`\n${isDue.join('\n')}`}
							</Typography.Text>
						</div>
					),
					style: { border: 'solid 2px #facc14', borderRadius: '0.25rem', backgroundColor: '#fffaf2' },
					duration: 8
				});
			}
			dispatch(userWasNotified());
		}
	}, [shouldNotifyUser, tasks, tasksStatus]);

	if (isStatusLoading(getWeddingDetailsStatus))
		return (
			<Center size='small'>
				<LoadingScreen container='fill' />
			</Center>
		);

	if (isStatusSuccess(getWeddingDetailsStatus)) {
		return (
			<>
				<Row justify='center' style={{ marginTop: '2em' }}>
					<Col xs={22} sm={22} md={20} lg={16}>
						<Row justify='space-between'>
							<Col span={22}>
								<PageTitle title={`Dane szczegółowe wesela ${wedding.name}`} />
							</Col>
						</Row>

						<Row justify='space-between' style={{ marginBottom: '1em' }}>
							<Col span={1} style={{ paddingTop: '0em' }}>
								<GoToPreviousPageButton />
							</Col>
							<Col span={22}></Col>
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
							<Descriptions.Item label='Godzina ceremonii weselnej'>
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
							<Descriptions.Item label='Koszt usług'>
								{wedding.sumCostTask ? `${wedding.sumCostTask} zł` : <em>--</em>}
							</Descriptions.Item>
							<Descriptions.Item label='Koszt napojów'>
								{wedding.sumCostBeverage ? `${wedding.sumCostBeverage} zł` : <em>--</em>}
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
