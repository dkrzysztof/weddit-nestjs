import { SettingFilled } from '@ant-design/icons';
import { Dropdown, Button, Tag } from 'antd';
import { BeverageForGetBeveragesResponse } from 'App/api/beverages/responses/GetAllBeveragesResponse';
import ConfiguredTable from 'App/common/components/ConfiguredTable';
import defaultPageQueryParams from 'App/common/utils/defaultPageQueryParams';
import { getBeverages } from 'App/state/beverages/beverages.thunk';
import { RootState } from 'App/state/root.reducer';
import React, { Dispatch } from 'react';
import OptionsBeverageContainer from './OptionsBeverageContainer';
import '../styles/GetBeverages.less';
import { CSSProperties } from 'react';

interface GetBeveragesContainerProps {
	idWedding: number;
}

const TagStyle: CSSProperties = { padding: '0.5em 1em' };

const GetBeveragesContainer: React.FC<GetBeveragesContainerProps> = ({ idWedding }) => {
	const renderBeveragesColumns = (beverages: BeverageForGetBeveragesResponse[], dispatch: Dispatch<any>) => [
		{
			title: 'Nazwa napoju',
			dataIndex: 'name'
		},
		{
			title: 'Cena za sztukę\n(PLN)',
			responsive: ['sm'],
			render: (row: BeverageForGetBeveragesResponse) => `${row.price} zł`,
			align: 'right'
		},
		{
			title: 'Objętość jednego opakowania\n(litr)',
			responsive: ['lg'],
			render: (row: BeverageForGetBeveragesResponse) => `${row.bottleCapacity} l`,
			align: 'right'
		},
		{
			title: 'Współczynnik konsumpcji\n(litr/osoba)',
			dataIndex: 'consumingFactor',
			responsive: ['lg'],
			align: 'right'
		},
		{
			title: 'Liczba konsumentów',
			dataIndex: 'consumersCount',
			responsive: ['lg'],
			align: 'center'
		},
		{
			title: 'Sugerowana ilość sztuk',
			responsive: ['lg'],
			render: (row: BeverageForGetBeveragesResponse) => <Tag style={TagStyle}>{row.neededAmount}</Tag>,
			align: 'center'
		},
		{
			title: 'Zakupiona ilość',
			responsive: ['md'],
			align: 'center',
			render: (row: BeverageForGetBeveragesResponse) => <Tag style={TagStyle}>{row.boughtAmount}</Tag>
		},
		{
			title: 'Pozostała ilość',
			align: 'center',
			render: (row: BeverageForGetBeveragesResponse) => (
				<Tag color={row.neededAmount <= row.boughtAmount ? 'green' : 'volcano'} style={TagStyle}>
					{row.neededAmount <= row.boughtAmount ? '0' : row.neededAmount - row.boughtAmount}
				</Tag>
			)
		},
		{
			title: 'Opcje',
			align: 'center',
			render: (beverage: BeverageForGetBeveragesResponse) => {
				return (
					<h1>
						<Dropdown
							overlay={<OptionsBeverageContainer idWedding={idWedding} beverage={beverage} />}
							placement='bottomCenter'
							trigger={['click']}
						>
							<Button type='link'>
								<SettingFilled />
							</Button>
						</Dropdown>
					</h1>
				);
			}
		}
	];

	return (
		<div id='get-beverages-container'>
			<ConfiguredTable
				rowKey='idBeverage'
				columnsRenderMethod={renderBeveragesColumns}
				getCollectionThunkAction={() => getBeverages(defaultPageQueryParams, idWedding)}
				selectCollection={(state: RootState) => state.beverages.beverages}
				selectCollectionGetQueryParams={(state: RootState) => state.beverages.queryParams}
				selectCollectionGetStatus={(state: RootState) => state.beverages.status.getBeverages}
				style={{ maxWidth: '1200px', margin: '2em auto' }}
			/>
		</div>
	);
};

export default GetBeveragesContainer;
