import { EllipsisOutlined } from '@ant-design/icons';
import { Dropdown, Button, Menu } from 'antd';
import { BeverageForGetBeveragesResponse } from 'App/api/beverages/responses/GetAllBeveragesResponse';
import ConfiguredTable from 'App/common/components/ConfiguredTable';
import defaultPageQueryParams from 'App/common/utils/defaultPageQueryParams';
import { getBeverages } from 'App/state/beverages/beverages.thunk';
import { RootState } from 'App/state/root.reducer';
import React, { Dispatch } from 'react';
import OptionsBeverageContainer from './OptionsBeverageContainer';

interface GetBeveragesContainerProps {
	idWedding: number;
}

const GetBeveragesContainer: React.FC<GetBeveragesContainerProps> = ({ idWedding }) => {
	const renderBeveragesColumns = (beverages: BeverageForGetBeveragesResponse[], dispatch: Dispatch<any>) => [
		{
			title: 'Nazwa napoju',
			dataIndex: 'name'
		},
		{
			title: 'Cena za sztukę ',
			dataIndex: 'price',
			responsive: ['sm']
		},
		{
			title: 'Objętość jednego opakowania',
			dataIndex: 'bottleCapacity',
			responsive: ['lg']
		},
		{
			title: 'Współczynnik konsumpcji',
			dataIndex: 'consumingFactor',
			responsive: ['lg']
		},
		{
			title: 'Liczba konsumentów',
			dataIndex: 'consumersCount',
			responsive: ['lg']
		},
		{
			title: 'Docelowa ilość sztuk',
			dataIndex: 'neededAmount',
			responsive: ['lg']
		},
		{
			title: 'Zakupiona ilość',
			dataIndex: 'boughtAmount',
			responsive: ['md']
		},
		{
			title: 'Pozostała ilość',
			dataIndex: 'remainingAmount'
		},
		{
			title: 'Opcje',
			render: (beverage: BeverageForGetBeveragesResponse) => {
				return (
					<Dropdown
						overlay={<OptionsBeverageContainer idWedding={idWedding} beverage={beverage} />}
						placement='bottomCenter'
						trigger={['click']}
					>
						<Button>
							<EllipsisOutlined style={{ color: '#8674aa' }} />
						</Button>
					</Dropdown>
				);
			}
		}
	];

	return (
		<>
			<ConfiguredTable
				rowKey='idBeverage'
				columnsRenderMethod={renderBeveragesColumns}
				getCollectionThunkAction={() => getBeverages(defaultPageQueryParams, idWedding)}
				selectCollection={(state: RootState) => state.beverages.beverages}
				selectCollectionGetQueryParams={(state: RootState) => state.beverages.queryParams}
				selectCollectionGetStatus={(state: RootState) => state.beverages.status.getBeverages}
			/>
		</>
	);
};

export default GetBeveragesContainer;
