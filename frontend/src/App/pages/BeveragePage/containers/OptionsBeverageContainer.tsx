import { Menu, Modal } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { UpdateBeverageRequest } from 'App/api/beverages/requests';
import { BeverageForGetBeveragesResponse } from 'App/api/beverages/responses/GetAllBeveragesResponse';
import { deleteBeverage, getBeverages, updateBeverage } from 'App/state/beverages/beverages.thunk';
import { RootState } from 'App/state/root.reducer';
import { isStatusLoading } from 'App/types/requestStatus';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EditBeverageForm from '../components/EditBeverageForm';

interface OptionsBeverageContainerProps {
	beverage: BeverageForGetBeveragesResponse;
	idWedding: number;
}

const OptionsBeverageContainer: React.FC<OptionsBeverageContainerProps> = ({ beverage, idWedding }) => {
	const [visible, setVisible] = useState(false);
	const dispatch = useDispatch();
	const loading = useSelector((state: RootState) => isStatusLoading(state.beverages.status.updateBeverage));
	const params = useSelector((state: RootState) => state.beverages.queryParams);
	const [form] = useForm();

	const openModal = () => setVisible(true);
	const closeModal = () => setVisible(false);

	const handleDeleteBeverage = () => {
		Modal.confirm({
			title: 'Potwierdź usunięcie wpisu!',
			content: `Czy, aby na pewno chcesz usunąć napój ${beverage.name}?`,
			onOk: () =>
				dispatch(
					deleteBeverage(idWedding, beverage.idBeverage, () => {
						dispatch(getBeverages(params, idWedding));
					})
				),
			onCancel: closeModal
		});
	};
	const handleUpdateBeverage = () => {
		form.validateFields().then((values: UpdateBeverageRequest) => {
			for (let key in values) {
				if (values[key] === undefined || values[key] === null) {
					delete values[key];
				} else if (key !== 'name' && typeof values[key] === 'string') {
					if (values[key].toString().includes('.')) values[key] = Number.parseFloat(values[key]);
					else values[key] = Number.parseInt(values[key]);
				}
			}

			dispatch(
				updateBeverage(idWedding, beverage.idBeverage, values, () => {
					dispatch(getBeverages(params, idWedding));
					closeModal();
				})
			);
		});
	};

	return (
		<>
			<Menu style={{ border: '1px solid #5923ef', borderRadius: '0.15rem', zIndex: 2 }}>
				<Menu.Item onClick={openModal}>Edytuj</Menu.Item>
				<Menu.Item onClick={handleDeleteBeverage}>Usuń</Menu.Item>
			</Menu>
			<Modal visible={visible} onOk={handleUpdateBeverage} onCancel={closeModal}>
				<EditBeverageForm form={form} initialValues={beverage} loading={loading} />
			</Modal>
		</>
	);
};

export default OptionsBeverageContainer;
