import { CheckSquareOutlined, CloseSquareOutlined } from '@ant-design/icons';
import { Typography, Tag, Row, Col, Button, Checkbox } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { GuestForGetGuestsResponse } from 'App/api/guests/responses';
import ConfiguredTable from 'App/common/components/ConfiguredTable';
import { deleteGuest, getGuests, updateGuest } from 'App/state/guests/guests.thunk';
import { RootState } from 'App/state/root.reducer';
import React, { Dispatch } from 'react';
import { useSelector } from 'react-redux';
import TagWithDropdown from '../components/TagWithDropdown';
import '../styles/GetGuestsContainer.less';

const GetGuestsContainer: React.FC<{ idWedding: number }> = ({ idWedding }) => {
	const params = useSelector((state: RootState) => state.guests.guestsQueryParams);
	const renderGuestsColumns = (guests: GuestForGetGuestsResponse[], dispatch: Dispatch<any>) => [
		{
			title: 'Imię',
			render: (record: GuestForGetGuestsResponse) => {
				const onChange = (firstName) => {
					if (firstName !== record.firstName) {
						dispatch(updateGuest(idWedding, record.idGuest, { firstName }, params));
					}
				};

				return (
					<Typography.Text strong editable={{ onChange }}>
						{record.firstName}
					</Typography.Text>
				);
			}
		},
		{
			title: 'Nazwisko',
			render: (record: GuestForGetGuestsResponse) => {
				const onChange = (lastName) => {
					if (lastName !== record.lastName) {
						dispatch(updateGuest(idWedding, record.idGuest, { lastName }, params));
					}
				};

				return (
					<Typography.Text strong editable={{ onChange }}>
						{record.lastName}
					</Typography.Text>
				);
			}
		},
		{
			title: 'Potwierdził zaproszenie',
			width: 150,
			render: (record: GuestForGetGuestsResponse) => {
				const onChange = ({ target }: CheckboxChangeEvent) => {
					if (target.checked !== record.confirmed) {
						dispatch(updateGuest(idWedding, record.idGuest, { confirmed: target.checked }, params));
					}
				};

				return <Checkbox checked={record.confirmed} onChange={onChange} />;
			}
		},
		{
			title: 'Potwierdził zaproszenie',
			width: 150,
			render: (record: GuestForGetGuestsResponse) => {
				const onChange = ({ target }: CheckboxChangeEvent) => {
					if (target.checked !== record.confirmedAfters) {
						dispatch(updateGuest(idWedding, record.idGuest, { confirmedAfters: target.checked }, params));
					}
				};

				return <Checkbox checked={record.confirmedAfters} onChange={onChange} />;
			}
		},
		{
			title: 'Rodzaj gościa',
			render: (record: GuestForGetGuestsResponse) => (
				<TagWithDropdown record={record} dispatch={dispatch} params={params} idWedding={idWedding} />
			)
		},
		{
			title: 'Usuń',
			render: (record: GuestForGetGuestsResponse) => {
				const handleDelete = () => {
					dispatch(deleteGuest(idWedding, record.idGuest, params));
				};
				return (
					<Button onClick={handleDelete} type='link'>
						X
					</Button>
				);
			}
		}
	];

	return (
		<div id='get-guests-container'>
			<ConfiguredTable
				rowKey='idGuest'
				selectCollection={(state: RootState) => state.guests.guests}
				selectCollectionGetStatus={(state: RootState) => state.guests.status.getGuests}
				columnsRenderMethod={renderGuestsColumns}
				getCollectionThunkAction={(pagination) => getGuests(idWedding, pagination)}
				selectCollectionGetQueryParams={(state: RootState) => state.guests.guestsQueryParams}
			/>
		</div>
	);
};

export default GetGuestsContainer;
