import React, { Dispatch } from 'react';

import { Link } from 'react-router-dom';
import { Button, Modal, Dropdown, Menu } from 'antd';
import { ExclamationCircleOutlined, SettingFilled } from '@ant-design/icons';

import store from 'App/state/store';
import { WeddingForGetUserWeddings } from 'App/api/weddings/requests/GetUserWeddingsRequest';
import { deleteWedding } from 'App/state/weddings/weddings.thunk';

const squareOutlineStyle = {
	fontSize: '1.3em',
	marginLeft: '1.5em',
	marginRight: '0.3em'
};

export const renderWeddingTableColumns = (weddings: WeddingForGetUserWeddings[], dispatch: Dispatch<any>) => [
	{
		title: 'Wesele',
		render: (record: WeddingForGetUserWeddings) => (
			<Link to={`/weddings/${record.idWedding}/view`}>{record.name}</Link>
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
				<Link to={`weddings/${record.idWedding}/update`}>Edycja</Link>
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

	const params = store.getState().weddings.getUserWeddingsQueryParams;

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
				dispatch(deleteWedding(idWedding, params));
			}
		});
	};
}
