import React, { Dispatch } from 'react';

import { Link } from 'react-router-dom';
import { Button, Modal, Dropdown, Menu } from 'antd';
import { CheckSquareOutlined, CloseSquareOutlined, ExclamationCircleOutlined, SettingFilled } from '@ant-design/icons';

import { UserForGetUsersResponse } from 'App/api/admin/responses/getUsersResponse';
import { deleteUser } from 'App/state/admin/users/users.thunk';
import store from 'App/state/store';

const squareOutlineStyle = {
	fontSize: '1.3em',
	marginLeft: '1.5em',
	marginRight: '0.3em'
};

export const renderTableColumns = (users: UserForGetUsersResponse[], dispatch: Dispatch<any>) => [
	{
		title: 'Imię',
		dataIndex: 'firstName',
		render: (firstName, record) => <Link to={`/admin/users/${record.idUser}`}>{firstName}</Link>
	},
	{ title: 'Nazwisko', dataIndex: 'lastName' },
	{ title: 'Email', dataIndex: 'email' },
	{
		title: 'Administrator',
		dataIndex: 'isAdmin',
		render: (isAdmin: boolean) => (
			<>
				{isAdmin ? (
					<CheckSquareOutlined style={{ color: '#52c41a', ...squareOutlineStyle }} />
				) : (
					<CloseSquareOutlined style={{ color: 'gainsboro', ...squareOutlineStyle }} />
				)}
			</>
		)
	},
	{
		title: 'Akcje',
		render: (record: UserForGetUsersResponse) => (
			<h1>
				<Dropdown
					overlay={menuForActionDropdown(record, users, dispatch)}
					trigger={['click']}
					placement='bottomCenter'
				>
					<Button type='link'>
						<SettingFilled />
					</Button>
				</Dropdown>
			</h1>
		)
	}
];

const menuForActionDropdown = (
	record: UserForGetUsersResponse,
	users: UserForGetUsersResponse[],
	dispatch: Dispatch<any>
) => (
	<Menu>
		<Menu.Item>
			<Button type='link'>
				<Link to={`/admin/users/${record.idUser}/update`}>Edycja</Link>
			</Button>
		</Menu.Item>
		<Menu.Item>
			<Button type='link' onClick={confirmUserDelete(record.idUser, users, dispatch)}>
				Usuń
			</Button>
		</Menu.Item>
	</Menu>
);

export function confirmUserDelete(userId: number, users: UserForGetUsersResponse[], dispatch: Dispatch<any>) {
	const { confirm } = Modal;

	const params = store.getState().admin.users.getUsersParams;

	return () => {
		const userToDelete = users.find((u) => u.idUser === userId);
		confirm({
			title: `Czy na pewno chcesz usunąć użytkownika ${userToDelete?.firstName} ${userToDelete?.lastName}?`,
			icon: <ExclamationCircleOutlined />,
			content: 'Wykonanie tej akcji będzie nieodwracalne!',
			okText: 'Tak',
			okType: 'primary',
			cancelText: 'Nie',
			onOk() {
				dispatch(deleteUser(userId, params));
			}
		});
	};
}
