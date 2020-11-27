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
	}, []);

	const openCreateUserModal = () => setCreateUserModalVisible(true);
	const closeCreateUserModal = () => setCreateUserModalVisible(false);

	const openUploadGuestsFileModal = () => setUploadFileVisible(true);
	const closeUploadGuestsFileModal = () => setUploadFileVisible(false);

	return (
		<>
			<Row justify='space-around'>
				<Col span={6}>
					<GoToPreviousPageButton />
				</Col>
				<Col span={6}>
					<Button onClick={openUploadGuestsFileModal} icon={<UploadOutlined />}>
						Importuj listę gości
					</Button>
				</Col>
				<Col span={6}>
					<Button onClick={openCreateUserModal}>Dodaj nowego Uczestnika wesela</Button>
				</Col>
				<Col span={24}>
					<br />
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
