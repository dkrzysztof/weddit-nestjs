import { Col, Row } from 'antd';
import { CreateWeddingPlanRequest } from 'App/api/weddings/requests';
import Center from 'App/common/components/Center';
import GoToPreviousPageButton from 'App/common/components/handleGoBack';
import { RootState } from 'App/state/root.reducer';
import { createUserWedding } from 'App/state/weddings/weddings.thunk';
import StatusType from 'App/types/requestStatus';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CreateWeddingForm from '../components/CreateWeddingForm';

const CreateWeddingContainer: React.FC<{}> = () => {
	const dispatch = useDispatch();
	const createWeddingStatus = useSelector((state: RootState) => state.weddings.status.createWedding);

	const handleCreateWeddingFormFinish = (values: CreateWeddingPlanRequest) => {
		if (values.budget) values.budget = Number.parseFloat(values.budget.toString());
		if (values.tablesTotalCount) values.tablesTotalCount = Number.parseInt(values.tablesTotalCount.toString());

		for (let key in values) {
			if (values[key] === undefined) {
				delete values[key];
			}
		}

		dispatch(createUserWedding(values));
	};

	return (
		<Center size='large'>
			<Row align='middle' justify='start' style={{ marginTop: '2em' }}>
				<Col>
					<GoToPreviousPageButton />
				</Col>
			</Row>
			<CreateWeddingForm
				loading={createWeddingStatus === StatusType.LOADING}
				onFinish={handleCreateWeddingFormFinish}
			/>
		</Center>
	);
};

export default CreateWeddingContainer;
