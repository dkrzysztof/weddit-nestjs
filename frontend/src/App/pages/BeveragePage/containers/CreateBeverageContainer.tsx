import { Row, Col, Button } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import Modal from 'antd/lib/modal/Modal';
import { CreateBeverageRequest } from 'App/api/beverages/requests';
import { createBeverage, getBeverages } from 'App/state/beverages/beverages.thunk';
import { RootState } from 'App/state/root.reducer';
import { isStatusLoading } from 'App/types/requestStatus';
import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CreateBeverageForm from '../components/CreateBeverageForm';

interface CreateBeverageContainerProps {
	idWedding: number;
}

const CreateBeverageContainer: React.FC<CreateBeverageContainerProps> = ({ idWedding }) => {
	const [visible, setVisible] = useState(false);
	const loading = useSelector((state: RootState) => isStatusLoading(state.beverages.status.createBeverage));
	const dispatch = useDispatch();
	const params = useSelector((state: RootState) => state.beverages.queryParams);
	const [form] = useForm();

	const handleCreateBeverage = () => {
		form.validateFields().then((values: CreateBeverageRequest) => {
			form.resetFields();

			for (let key in values) {
				if (values[key] === undefined || values[key] === null) {
					delete values[key];
				}
			}

			dispatch(
				createBeverage(idWedding, values, () => {
					dispatch(getBeverages(params, idWedding));
					closeModal();
				})
			);
		});
	};

	const closeModal = () => setVisible(false);
	const openModal = () => setVisible(true);

	return (
		<Row>
			<Col span={4}>
				<Button onClick={openModal}>Dodaj nowy napój</Button>
				<Modal
					title='Dodawanie nowego napoju'
					visible={visible}
					onOk={handleCreateBeverage}
					onCancel={closeModal}
					confirmLoading={loading}
				>
					<CreateBeverageForm form={form} loading={loading} />
				</Modal>
			</Col>
		</Row>
	);
};

export default CreateBeverageContainer;
