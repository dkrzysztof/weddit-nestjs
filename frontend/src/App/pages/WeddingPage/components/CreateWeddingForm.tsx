import { Button, Col, DatePicker, Form, Input, Row } from 'antd';
import { CreateWeddingPlanRequest } from 'App/api/weddings/requests';
import PageTitle from 'App/common/components/PageTitle';
import React, { useState } from 'react';

interface CreateWeddingFormProps {
	onFinish: (values: CreateWeddingPlanRequest) => void;
	loading: boolean;
}

const CreateWeddingForm: React.FC<CreateWeddingFormProps> = ({ onFinish, loading }) => {
	const [hasAfters, setCheckedAfters] = useState<boolean>(false);

	const wrapOnFinish = (values: CreateWeddingPlanRequest) => {
		values.hasAfters = hasAfters;

		onFinish(values);
	};

	return (
		<>
			<PageTitle title='Dodawanie nowego planu wesela' />
			<Form labelCol={{ span: 7 }} wrapperCol={{ span: 14 }} onFinish={wrapOnFinish}>
				<Form.Item label='Nazwa własna' rules={[{ required: true, type: 'string' }]} name='name'>
					<Input />
				</Form.Item>
				<Form.Item label='Data wesela' rules={[{ required: true }]} name='dateOfWedding'>
					<DatePicker />
				</Form.Item>
				<Form.Item label='Godzina wesela' name='hourOfWedding'>
					<Input type='time' />
				</Form.Item>
				<Form.Item label='Godzina mszy w kościele' name='hourOfChurchService'>
					<Input type='time' />
				</Form.Item>
				<Form.Item label='Czy będą wyprawiane poprawiny?' name='hasAfters'>
					<Input type='checkbox' checked={hasAfters} onChange={() => setCheckedAfters(!hasAfters)} />
				</Form.Item>
				<Form.Item label='Adres sali weselnej' name='address'>
					<Input type='text' />
				</Form.Item>
				<Form.Item label='Maksymalna liczba stolików na sali' name='tablesTotalCount'>
					<Input type='number'></Input>
				</Form.Item>
				<Form.Item label='Maksymalny budżet do wykorzystania' name='budget'>
					<Input type='number'></Input>
				</Form.Item>
				<Row align='middle' justify='center' style={{ width: '100%' }}>
					<Col span={16}>
						<Button loading={loading} block type='primary' htmlType='submit' style={{ width: '100%' }}>
							Wyślij
						</Button>
					</Col>
				</Row>
			</Form>
		</>
	);
};

export default CreateWeddingForm;
