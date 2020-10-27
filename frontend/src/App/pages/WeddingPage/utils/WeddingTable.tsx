import React, { Dispatch } from 'react';

import { Link } from 'react-router-dom';
import { Tag, Button, Modal, Dropdown, Menu, Checkbox } from 'antd';
import { CheckSquareOutlined, CloseSquareOutlined, ExclamationCircleOutlined, SettingFilled } from '@ant-design/icons';

import { UserForGetUsersResponse } from 'App/api/admin/responses/getUsersResponse';
import { deleteUser } from 'App/state/admin/users/users.thunk';
import { RootState } from 'App/state/root.reducer';
import { useSelector } from 'react-redux';
import store from 'App/state/store';
import { WeddingForGetUserWeddings } from 'App/api/weddings/requests/getUserWeddingsResponse';

const squareOutlineStyle = {
	fontSize: '1.3em',
	marginLeft: '1.5em',
	marginRight: '0.3em'
};

export const renderWeddingTableColumns = (weddings: WeddingForGetUserWeddings[], dispatch: Dispatch<any>) => [
	{
		title: 'Wesele',
		render: (record: WeddingForGetUserWeddings) => (
			<Link to={`/user/weddings/${record.idWedding}/view`}>{record.name}</Link>
		)
	},
	{ title: 'Dzień wesela', dataIndex: 'dateOfWedding' },
	{ title: 'Adres', dataIndex: 'address' },
	{
		title: 'Opcje',
		render: (record: WeddingForGetUserWeddings) => (
			<h1>
				<Dropdown
					overlay={menuForActionDropdown(record, weddings, dispatch)}
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
	record: WeddingForGetUserWeddings,
	weddings: WeddingForGetUserWeddings[],
	dispatch: Dispatch<any>
) => (
	<Menu>
		<Menu.Item>
			<Button type='link'>
				<Link to={`/weddings/${record.idWedding}/update`}>Edycja</Link>
			</Button>
		</Menu.Item>
		<Menu.Item>
			<Button type='link' onClick={confirmWeddingDelete(record.idWedding, weddings, dispatch)}>
				Usuń
			</Button>
		</Menu.Item>
	</Menu>
);

export function confirmWeddingDelete(
	idWedding: number,
	weddings: WeddingForGetUserWeddings[],
	dispatch: Dispatch<any>
) {
	const { confirm } = Modal;

	const params = store.getState().admin.users.getUsersParams;

	return () => {
		const weddingToDelete = weddings.find((u) => u.idWedding === idWedding);
		confirm({
			title: `Czy na pewno chcesz usunąć plan weselny o nazwie: ${weddingToDelete.name}?`,
			icon: <ExclamationCircleOutlined />,
			content: 'Wykonanie tej akcji będzie nieodwracalne!',
			okText: 'Tak',
			okType: 'primary',
			cancelText: 'Nie',
			onOk() {
				// dispatch(deleteUser(userId, params));
			}
		});
	};
}
