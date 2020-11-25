import React from 'react';
import { Form, Input, Row, Col, InputNumber } from 'antd';
import { FormInstance } from 'antd/lib/form/Form';

import { BeverageForGetBeveragesResponse } from 'App/api/beverages/responses/GetAllBeveragesResponse';

interface EditBeverageFormProps {
	form: FormInstance;
	loading: boolean;
	initialValues: BeverageForGetBeveragesResponse;
}

const EditBeverageForm: React.FC<EditBeverageFormProps> = ({ loading, form, initialValues }) => {
	return (
		<Form form={form} layout='vertical' wrapperCol={{ span: 24 }} initialValues={initialValues}>
			<Form.Item label='Nazwa napoju' name='name' rules={[{ required: true, message: 'To pole jest wymagane' }]}>
				<Input disabled={loading} />
			</Form.Item>

			<Row justify='space-between'>
				<Col xs={20} sm={13} md={12} lg={10} xl={10} xxl={10}>
					<Form.Item
						label='Objętość jednego opakowania'
						name='bottleCapacity'
						rules={[{ required: true, message: 'To pole jest wymagane' }]}
					>
						<InputNumber disabled={loading} precision={2} step={0.05} min={0.1} />
					</Form.Item>
				</Col>
				<Col xs={20} sm={13} md={12} lg={10} xl={10} xxl={10}>
					<Form.Item label='Cena za sztukę' name='price'>
						<InputNumber disabled={loading} precision={2} step={5} min={0} />
					</Form.Item>
				</Col>
			</Row>

			<Row justify='space-between'>
				<Col xs={20} sm={13} md={12} lg={10} xl={10} xxl={10}>
					<Form.Item label='Współczynnik konsumpcji' name='consumingFactor'>
						<InputNumber disabled={loading} precision={2} step={0.05} min={0.1} />
					</Form.Item>
				</Col>
				<Col xs={20} sm={13} md={12} lg={10} xl={10} xxl={10}>
					<Form.Item label='Liczba konsumentów' name='consumersCount'>
						<InputNumber disabled={loading} precision={0} step={1} min={1} />
					</Form.Item>
				</Col>
			</Row>
			<Row justify='space-between'>
				<Col xs={20} sm={13} md={12} lg={10} xl={10} xxl={10}>
					<Form.Item label='Zakupiona ilość' name='boughtAmount'>
						<InputNumber disabled={loading} precision={0} step={1} min={0} />
					</Form.Item>
				</Col>
			</Row>
		</Form>
	);
};

export default EditBeverageForm;
