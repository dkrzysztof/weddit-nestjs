import React, { useEffect } from 'react';
import { Button, Checkbox, Col, Form, Input, List, Modal, notification, Row, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'App/state/root.reducer';
import { RouteComponentProps } from 'react-router';
import {
	removeUserAccessToWedding,
	getUsersWithAccessToWedding,
	updateUserAccessToWedding
} from 'App/state/weddings/weddings.thunk';
import StatusType from 'App/types/requestStatus';
import { useState } from 'react';
import { FormProvider } from 'antd/lib/form/context';
import { UpdateUserAccessToWeddingRequest } from 'App/api/weddings/requests';
import agent from 'App/api/agent';
import AppConstants from 'App/constants/app.constants';
import { GetUsersWithAccessToWeddingResponse } from 'App/api/weddings/responses';
import { ExclamationCircleOutlined } from '@ant-design/icons';

type FormItemValidateStatus = '' | 'success' | 'warning' | 'error' | 'validating';

const EmailErrorMessage = 'Podany email nie pasuje do żadnego z kont!';

const { confirm } = Modal;

interface EmailValidation {
	validateStatus: FormItemValidateStatus;
	errorMsg: string | null;
}

interface WeddingUsersPermissionsProps {
	idWedding: number;
}

const WeddingUsersPermissions: React.FC<WeddingUsersPermissionsProps> = ({ idWedding }) => {
	const dispatch = useDispatch();
	const getUsersWithAccessToWeddingStatus = useSelector(
		(state: RootState) => state.weddings.status.getUsersWithAccessToWedding
	);
	let permissions = useSelector((state: RootState) => state.weddings.getUsersWithAccessToWedding) || [];

	if (!permissions) permissions = [];

	useEffect(() => {
		dispatch(getUsersWithAccessToWedding(idWedding));
	}, [dispatch, idWedding]);
	const [isUpdateModalVisible, setUpdateModalVisibility] = useState<boolean>(false);
	const [emailValidation, setEmailValidation] = useState<EmailValidation>({ validateStatus: '', errorMsg: null });
	const [editPermission, setEditPermission] = useState<boolean>(false);
	const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
	const [form] = Form.useForm();

	const handleShowUpdateUserModalClick = () => {
		setUpdateModalVisibility(true);
	};

	const handleUpdateUserAccessToWeddingConfirmClick = () => {
		form.validateFields().then(({ userEmail }: UpdateUserAccessToWeddingRequest) => {
			setConfirmLoading(true);
			agent.Wedding.updateUserAccessToWedding(idWedding, { userEmail, canEdit: editPermission })
				.then((res) => {
					setEmailValidation({
						validateStatus: 'success',
						errorMsg: null
					});

					setTimeout(() => {
						setConfirmLoading(false);
						setUpdateModalVisibility(false);
						dispatch(getUsersWithAccessToWedding(idWedding));
						notification.success({
							message: 'Sukces',
							description: 'Pomyślnie zaaktualizowano informacje o użytkowniku'
						});
					}, 1000);
				})
				.catch((err) => {
					setConfirmLoading(false);
					if (err === AppConstants.server.errorCodes.emailNotFound) {
						setEmailValidation({
							validateStatus: 'error',
							errorMsg: EmailErrorMessage
						});
					}
				});
		});
	};

	const handleUpdateUserAccessToWeddingCancelClick = () => {
		setUpdateModalVisibility(false);
		form.resetFields();
		setEditPermission(false);
	};

	const handleCanEditCheckboxChange = () => {
		setEditPermission(!editPermission);
	};

	const handleEmailInput = () => {
		setEmailValidation({
			errorMsg: null,
			validateStatus: ''
		});
	};

	const handleUserPermissionDelete = (item: GetUsersWithAccessToWeddingResponse) => {
		return () => {
			confirm({
				title: 'Usunąć pozwolenie na dostęp?',
				icon: <ExclamationCircleOutlined />,
				content: (
					<>
						<Typography.Text strong>
							{`Czy na pewno chcesz usunąć dostęp użytkownikowi ${item.firstName} ${item.lastName}?`}
						</Typography.Text>
						<br />
						Ta akcja jest nieodwracalna!
					</>
				),
				okText: 'Potwierdź',
				onOk: () => dispatch(removeUserAccessToWedding(idWedding, item.idUser)),
				cancelText: 'Anuluj'
			});
		};
	};

	return (
		<>
			<List
				loading={getUsersWithAccessToWeddingStatus === StatusType.LOADING}
				header={<div>Posiadają dostęp</div>}
				bordered
				dataSource={permissions}
				renderItem={(item) => (
					<List.Item>
						<Row justify='space-between' style={{ width: '100%' }}>
							<Col span={20} style={{ margin: 'auto' }}>
								<Typography.Text strong>
									{item.editPermission ? 'EDIT-ACCESS' : 'VIEW-ACCESS'}
								</Typography.Text>
								<span>{` ${item.email} ${item.firstName} ${item.lastName}`}</span>
							</Col>
							<Col span={4}>
								<Button type='link' onClick={handleUserPermissionDelete(item)}>
									X
								</Button>
							</Col>
						</Row>
					</List.Item>
				)}
			/>
			<Row className='mt-2' justify='end'>
				<Col span={8}>
					<Button type='dashed' style={{ width: '100%' }} onClick={handleShowUpdateUserModalClick}>
						Dodaj dostęp użytkownikowi
					</Button>
					<Modal
						title='Dodawanie nowego użytkownika'
						confirmLoading={confirmLoading}
						visible={isUpdateModalVisible}
						onOk={handleUpdateUserAccessToWeddingConfirmClick}
						onCancel={handleUpdateUserAccessToWeddingCancelClick}
						okText='Akceptuje'
						cancelText='Anuluj'
					>
						<Form form={form} initialValues={{ userEmail: '1@1.com' }}>
							<Form.Item
								validateStatus={emailValidation.validateStatus}
								help={emailValidation.errorMsg || ''}
								name='userEmail'
								labelCol={{ span: 24, offset: 0 }}
								wrapperCol={{ span: 22, offset: 0 }}
								label='Email zarejestrowanego w systemie użytkownika:'
							>
								<Input type='email' onInput={handleEmailInput} />
							</Form.Item>
							<Form.Item
								name='canEdit'
								label='Pozwolić na edytowanie planu?'
								labelAlign='left'
								labelCol={{ span: 12, offset: 0 }}
								wrapperCol={{ span: 2, offset: 1 }}
							>
								<Checkbox checked={editPermission} onChange={handleCanEditCheckboxChange} />
							</Form.Item>
						</Form>
					</Modal>
				</Col>
			</Row>
		</>
	);
};

export default WeddingUsersPermissions;
