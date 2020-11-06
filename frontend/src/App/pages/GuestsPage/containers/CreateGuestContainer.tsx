import { Button, Col, Row } from 'antd';
import { CreateGuestRequest } from 'App/api/guests/requests';
import GoToPreviousPageButton from 'App/common/components/handleGoBack';
import { createGuest, getGuestTypes } from 'App/state/guests/guests.thunk';
import { RootState } from 'App/state/root.reducer';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CreateGuestForm from '../components/CreateGuestForm';

interface CreatePageContainerProps {
	idWedding: number;
}

const CreatePageContainer: React.FC<CreatePageContainerProps> = ({ idWedding }) => {
	const [visible, setVisible] = useState<boolean>(false);
	const dispatch = useDispatch();
	const guestsQueryParams = useSelector((state: RootState) => state.guests.guestsQueryParams);

	const handleCreateUserFormCreate = (values: CreateGuestRequest) => {
		dispatch(createGuest(idWedding, values, guestsQueryParams));
		console.log(values);
		setVisible(false);
	};

	useEffect(() => {
		dispatch(getGuestTypes());
	}, []);

	const handleCancel = () => setVisible(false);

	return (
		<>
			<Row justify='space-around'>
				<Col span={6}>
					<GoToPreviousPageButton />
				</Col>
				<Col span={6}>
					<Button onClick={() => setVisible(true)}>Dodaj nowego Uczestnika wesela</Button>
				</Col>
				<Col span={24}>
					<br />
				</Col>
			</Row>
			<CreateGuestForm onCancel={handleCancel} onCreate={handleCreateUserFormCreate} visible={visible} />
		</>
	);
};

export default CreatePageContainer;
