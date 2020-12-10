import { Button, Col, Form, Input, InputNumber, Row } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { UpdateWeddingDetailsRequest } from 'App/api/weddings/requests';
import { GetWeddingDetailsResponse } from 'App/api/weddings/responses';
import React, { useState } from 'react';

interface UpdateWeddingFormProps {
	onFinish: (values: UpdateWeddingDetailsRequest) => void;
	loading: boolean;
	initialValues: GetWeddingDetailsResponse;
}

const UpdateWeddingForm: React.FC<UpdateWeddingFormProps> = ({ onFinish, loading, initialValues }) => {
	const [form] = useForm();

	const [checked, setChecked] = useState<boolean>(initialValues.hasAfters);

	const handleFinishForm = (values: UpdateWeddingDetailsRequest) => {
		values.hasAfters = checked;
		console.log(values.hasAfters);
		for (let key in values) {
			if (values[key] === undefined || values[key] === null) {
				delete values[key];
			}
		}

		onFinish(values);
	};

	return (
		<>
			<Form form={form} layout='vertical' onFinish={handleFinishForm} initialValues={initialValues}>
				<Row justify='space-between'>
					<Col span={10}>
						<Form.Item label='Nazwa wesela' labelAlign='left' name='name'>
							<Input type='text' disabled={loading} />
						</Form.Item>
						<Form.Item label='Godzina rozpoczęcia wesela' name='hourOfWedding'>
							<Input type='time' disabled={loading} />
						</Form.Item>
						<Form.Item label='Godzina rozpoczęcia mszy w kościele' name='hourOfChurchService'>
							<Input type='time' disabled={loading} />
						</Form.Item>
						<Form.Item label='Czy będą poprawiny?' name='hasAfters'>
							<Input
								disabled={loading}
								type='checkbox'
								onChange={() => setChecked(!checked)}
								checked={checked}
							/>
						</Form.Item>
					</Col>
					<Col span={10}>
						<Form.Item label='Data wesela' name='dateOfWedding'>
							<Input type='date' disabled={loading} />
						</Form.Item>
						<Form.Item label='Adres sali weselnej' name='address'>
							<Input type='string' disabled={loading} />
						</Form.Item>
						<Form.Item label='Liczba stolików na sali weselnej' name='tablesTotalCount'>
							<InputNumber
								disabled={loading}
								precision={0}
								min={0}
								step={1}
								type='number'
								style={{ width: '100%' }}
							/>
						</Form.Item>
						<Form.Item label='Dopuszczalny budżet' name='budget'>
							<InputNumber
								disabled={loading}
								precision={2}
								min={0}
								step={50.0}
								type='number'
								style={{ width: '100%' }}
							/>
						</Form.Item>
					</Col>
				</Row>
				<br></br>
				<Row justify='end' align='middle'>
					<Col xs={20} sm={20} md={6} xl={4}>
						<Button type='primary' style={{ width: '100%' }} loading={loading} htmlType='submit'>
							Zapisz
						</Button>
					</Col>
					<Col xs={2} sm={2} md={0} lg={0} />
				</Row>
			</Form>
		</>
	);
};

export default UpdateWeddingForm;
