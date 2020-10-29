import React, { useEffect } from 'react';
import { Button, Col, List, Row, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'App/state/root.reducer';
import { RouteComponentProps } from 'react-router';
import { getUsersWithAccessToWedding } from 'App/state/weddings/weddings.thunk';
import StatusType from 'App/types/requestStatus';

interface WeddingUsersPermissionsProps {
	idWedding: number;
}

const WeddingUsersPermissions: React.FC<WeddingUsersPermissionsProps> = ({ idWedding }) => {
	const dispatch = useDispatch();
	const getUsersWithAccessToWeddingStatus = useSelector(
		(state: RootState) => state.weddings.status.getUsersWithAccessToWedding
	);
	let permissions = useSelector((state: RootState) => state.weddings.getUsersWithAccessToWedding) || [];

	if (!permissions) {
		permissions = [];
	}

	useEffect(() => {
		dispatch(getUsersWithAccessToWedding(idWedding));
	}, [dispatch, idWedding]);

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
								<Button type='link'>X</Button>
							</Col>
						</Row>
					</List.Item>
				)}
			/>
			<Row className='mt-2' justify='end'>
				<Col span={8}>
					<Button type='dashed' style={{ width: '100%' }}>
						Dodaj dostęp użytkownikowi
					</Button>
				</Col>
			</Row>
		</>
	);
};

export default WeddingUsersPermissions;
