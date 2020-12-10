import React, { Dispatch } from 'react';

import { Link } from 'react-router-dom';
import { Button, Modal, Dropdown, Menu, Tag } from 'antd';
import { ExclamationCircleOutlined, SettingFilled } from '@ant-design/icons';

import store from 'App/state/store';
import { WeddingForGetUserWeddings } from 'App/api/weddings/requests/GetUserWeddingsRequest';
import { deleteWedding } from 'App/state/weddings/weddings.thunk';
import { dateLocale } from 'App/types/dateLocale';

export const renderWeddingTableColumns = (weddings: WeddingForGetUserWeddings[], dispatch: Dispatch<any>) => [
	{
		title: 'Wesele',
		render: (record: WeddingForGetUserWeddings) => (
			<Button type='default' style={{ margin: 'auto' }}>
				<Link to={`/weddings/${record.idWedding}/view`}>{record.name}</Link>
			</Button>
		)
	},
	{
		title: 'Dzień wesela',
		render: (row: WeddingForGetUserWeddings) => row.dateOfWedding.toLocaleDateString('pl', dateLocale)
	},
	{ title: 'Adres', dataIndex: 'address' },
	{
		title: 'Ilość gości',
		render: (row: WeddingForGetUserWeddings) => {
			if (row.size < 50) {
				return <Tag color='#FFC75F'>{row.size}</Tag>;
			}
			if (row.size < 100) {
				return <Tag color='#FF9671'>{row.size}</Tag>;
			}
			if (row.size < 150) {
				return <Tag color='#D65DB1'>{row.size}</Tag>;
			} else {
				return <Tag color='#845EC2'>{row.size}</Tag>;
			}
		}
	},
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
