import { Col, Collapse, Row } from 'antd';
import { UpdateWeddingDetailsRequest } from 'App/api/weddings/requests';
import Center from 'App/common/components/Center';
import GoToPreviousPageButton from 'App/common/components/handleGoBack';
import LoadingScreen from 'App/common/components/LoadingScreen';
import PageTitle from 'App/common/components/PageTitle';
import { RootState } from 'App/state/root.reducer';
import { getWeddingDetails, updateWedding } from 'App/state/weddings/weddings.thunk';
import StatusType from 'App/types/requestStatus';
import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import UpdateWeddingForm from '../components/UpdateWeddingForm';
import WeddingUsersPermissions from './WeddingUsersPermissions';

const { Panel } = Collapse;

interface WeddingRouteProps {
	idWedding: string;
}

const SettingsWeddingContainer: React.FC<RouteComponentProps<WeddingRouteProps>> = ({ match }) => {
	const idWedding = Number.parseInt(match.params.idWedding);

	const dispatch = useDispatch();
	const wedding = useSelector((state: RootState) => state.weddings.selectedWedding);
	const isUpdating = useSelector((state: RootState) => state.weddings.status.updateWedding === StatusType.LOADING);

	useEffect(() => {
		dispatch(getWeddingDetails(idWedding));
	}, [dispatch, idWedding]);

	const handleUpdateWeddingDetailsFormSubmit = (values: UpdateWeddingDetailsRequest) => {
		dispatch(updateWedding(idWedding, values));
	};

	if (!wedding) {
		return <LoadingScreen container='fill' />;
	} else {
		return (
			<Center size='medium'>
				<Row justify='start'>
					<Col>
						<GoToPreviousPageButton />
					</Col>
				</Row>
				<PageTitle title={`Ustawienia wesela ${wedding.name}`} />
				<Collapse defaultActiveKey={['1']}>
					<Panel header='Szczegółowe dane wesela' key='1'>
						<UpdateWeddingForm
							initialValues={wedding}
							onFinish={handleUpdateWeddingDetailsFormSubmit}
							loading={isUpdating}
						/>
					</Panel>
					<Panel header='Zarządzanie dostępem użytkowników' key='2'>
						<WeddingUsersPermissions idWedding={idWedding} />
					</Panel>
				</Collapse>
			</Center>
		);
	}
};

export default SettingsWeddingContainer;
