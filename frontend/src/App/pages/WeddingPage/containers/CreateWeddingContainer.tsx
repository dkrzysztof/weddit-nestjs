import React from 'react';

import Center from 'App/common/components/Center';
import CreateWeddingForm from '../components/CreateWeddingForm';
import { CreateWeddingPlanRequest } from 'App/api/weddings/requests';
import { useDispatch, useSelector } from 'react-redux';
import { createUserWedding } from 'App/state/weddings/weddings.thunk';
import { RootState } from 'App/state/root.reducer';
import StatusType from 'App/types/requestStatus';
import GoToPreviousPageButton from 'App/common/components/handleGoBack';
import { useHistory } from 'react-router';

const CreateWeddingContainer: React.FC<{}> = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const createWeddingStatus = useSelector((state: RootState) => state.weddings.status.createWedding);

	const handleCreateWeddingFormFinish = (values: CreateWeddingPlanRequest) => {
		dispatch(createUserWedding(values));
	};

	return (
		<Center size='large'>
			<GoToPreviousPageButton />
			<CreateWeddingForm
				loading={createWeddingStatus === StatusType.LOADING}
				onFinish={handleCreateWeddingFormFinish}
			/>
		</Center>
	);
};

export default CreateWeddingContainer;
