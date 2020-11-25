import { Dropdown, Menu, Tag } from 'antd';
import { GuestForGetGuestsResponse } from 'App/api/guests/responses';
import { GetGuestTypesResponse } from 'App/api/guestTypes/responses';
import { updateGuest } from 'App/state/guests/guests.thunk';
import { RootState } from 'App/state/root.reducer';
import React, { Dispatch } from 'react';
import { useSelector } from 'react-redux';

interface TagWithDropdownProps {
	record: GuestForGetGuestsResponse;
	dispatch: Dispatch<any>;
	idWedding: number;
	params: any;
}

const menu = (guestTypes: GetGuestTypesResponse, handleClick: (idGuestType: number) => void) => (
	<Menu>
		{guestTypes.map((type, key) => (
			<Menu.Item key={key} onClick={() => handleClick(type.idGuestType)}>
				<Tag color={switchColor(type.idGuestType)} style={{ cursor: 'pointer' }}>
					{type.name}
				</Tag>
			</Menu.Item>
		))}
	</Menu>
);

function switchColor(idGuestType) {
	switch (idGuestType) {
		case 1:
			return 'purple';

		case 2:
			return 'green';

		case 3:
			return 'orange';

		case 4:
			return 'blue';

		case 5:
			return 'volcano';
		default:
			return 'default';
	}
}

const TagWithDropdown: React.FC<TagWithDropdownProps> = ({
	record: { idGuest, idGuestType, guestType },
	idWedding,
	dispatch,
	params
}) => {
	const types = useSelector((state: RootState) => state.guests.guestTypes);

	let color = switchColor(idGuestType);

	const handleTagClick = (typeId) => {
		console.log(typeId, idGuestType);
		if (typeId !== idGuestType) dispatch(updateGuest(idWedding, idGuest, { idGuestType: typeId }, params));
	};

	return (
		<Dropdown overlay={menu(types, handleTagClick)} trigger={['click']}>
			<Tag color={color} style={{ cursor: 'pointer' }}>
				{guestType}
			</Tag>
		</Dropdown>
	);
};

export default TagWithDropdown;
