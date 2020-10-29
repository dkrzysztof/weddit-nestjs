import { Button, Checkbox, DatePicker, Form, Input } from 'antd';
import { CreateWeddingPlanRequest } from 'App/api/weddings/requests';
import { RootState } from 'App/state/root.reducer';
import StatusType from 'App/types/requestStatus';
import React from 'react';
import { useSelector } from 'react-redux';

interface CreateWeddingFormProps {
	onFinish: (values: CreateWeddingPlanRequest) => void;
	loading: boolean;
}

const CreateWeddingForm: React.FC<CreateWeddingFormProps> = ({ onFinish, loading }) => {
	return (
		<Form labelCol={{ span: 7 }} wrapperCol={{ span: 14 }} onFinish={onFinish}>
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
				<Input type='checkbox' />
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
			<Form.Item>
				<Button loading={loading} block type='primary' htmlType='submit'>
					Wyślij
				</Button>
			</Form.Item>
		</Form>
	);
};

export default CreateWeddingForm;
