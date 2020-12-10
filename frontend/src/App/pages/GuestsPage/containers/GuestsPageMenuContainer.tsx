import { UploadOutlined } from '@ant-design/icons';
import { Button, Col, Row } from 'antd';
import { CreateGuestRequest } from 'App/api/guests/requests';
import GoToPreviousPageButton from 'App/common/components/handleGoBack';
import { createGuest, getGuestTypes } from 'App/state/guests/guests.thunk';
import { RootState } from 'App/state/root.reducer';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CreateGuestForm from '../components/CreateGuestForm';
import UploadGuestsFileModal from '../components/UploadGuestsFileModal';

interface GuestsPageMenuContainerProps {
	idWedding: number;
}

const GuestsPageMenuContainer: React.FC<GuestsPageMenuContainerProps> = ({ idWedding }) => {
	const [createUserModalVisible, setCreateUserModalVisible] = useState<boolean>(false);
	const [uploadFileVisible, setUploadFileVisible] = useState<boolean>(false);
	const dispatch = useDispatch();
	const guestsQueryParams = useSelector((state: RootState) => state.guests.guestsQueryParams);

	const handleCreateUserFormCreate = (values: CreateGuestRequest) => {
		dispatch(createGuest(idWedding, values, guestsQueryParams));
		setCreateUserModalVisible(false);
	};

	useEffect(() => {
		dispatch(getGuestTypes());
	}, [dispatch]);

	const openCreateUserModal = () => setCreateUserModalVisible(true);
	const closeCreateUserModal = () => setCreateUserModalVisible(false);

	const openUploadGuestsFileModal = () => setUploadFileVisible(true);
	const closeUploadGuestsFileModal = () => setUploadFileVisible(false);

	return (
		<>
			<Row justify='space-between'>
				<Col xs={4} sm={4} md={4} lg={4} style={{ marginTop: '1em' }}>
					<GoToPreviousPageButton />
				</Col>
				<Col xs={14} sm={12} md={5} lg={4} style={{ marginTop: '1em' }}>
					<Button onClick={openUploadGuestsFileModal} icon={<UploadOutlined />} style={{ width: '100%' }}>
						Importuj listę gości
					</Button>
				</Col>
				<Col xs={24} sm={24} md={7} lg={5} style={{ marginTop: '1em' }}>
					<Button onClick={openCreateUserModal} style={{ width: '100%' }}>
						Dodaj nowego Uczestnika wesela
					</Button>
				</Col>
			</Row>
			<UploadGuestsFileModal
				idWedding={idWedding}
				visible={uploadFileVisible}
				onCancel={closeUploadGuestsFileModal}
				onOk={closeUploadGuestsFileModal}
			/>
			<CreateGuestForm
				onCancel={closeCreateUserModal}
				onCreate={handleCreateUserFormCreate}
				visible={createUserModalVisible}
			/>
		</>
	);
};

export default GuestsPageMenuContainer;
