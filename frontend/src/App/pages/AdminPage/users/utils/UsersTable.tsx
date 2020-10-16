import React, { Dispatch } from 'react';

import { Link } from 'react-router-dom';
import { Tag, Button, Modal, Dropdown, Menu } from 'antd';
import { ExclamationCircleOutlined, SettingFilled } from '@ant-design/icons';

import { UserForGetUsersResponse } from 'App/api/admin/responses/getUsersResponse';
import { deleteUser } from 'App/state/admin/users/users.thunk';

export const renderTableColumns = (users: UserForGetUsersResponse[], dispatch: Dispatch<any>) => [
	{
		title: 'Imię',
		dataIndex: 'firstName',
		render: (firstName, record) => <Link to={`/admin/users/${record.id}`}>{firstName}</Link>
	},
	{ title: 'Nazwisko', dataIndex: 'lastName' },
	{ title: 'Email', dataIndex: 'email' },
	{ title: 'Potwierdzono email', dataIndex: 'emailConfirmed' },
	{
		title: 'Role',
		dataIndex: 'roles',
		render: (roles: string[]) => (
			<>
				{roles.map((role: string) => {
					let color = role === 'Administrator' ? 'blue' : 'volcano';
					return (
						<Tag key={role} color={color}>
							{role}
						</Tag>
					);
				})}
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
				<Link to={`/admin/users/${record.id}/update`}>Edycja</Link>
			</Button>
		</Menu.Item>
		<Menu.Item>
			<Button type='link' onClick={confirmUserDelete(record.id, users, dispatch)}>
				Usuń
			</Button>
		</Menu.Item>
	</Menu>
);

export function confirmUserDelete(userId: string, users: UserForGetUsersResponse[], dispatch: Dispatch<any>) {
	const { confirm } = Modal;

	return () => {
		const userToDelete = users.find((u) => u.id === userId);
		confirm({
			title: `Czy na pewno chcesz usunąć użytkownika ${userToDelete?.firstName} ${userToDelete?.lastName}?`,
			icon: <ExclamationCircleOutlined />,
			content: 'Wykonanie tej akcji będzie nieodwracalne!',
			okText: 'Tak',
			okType: 'primary',
			cancelText: 'Nie',
			onOk() {
				dispatch(deleteUser(userId));
			}
		});
	};
}
