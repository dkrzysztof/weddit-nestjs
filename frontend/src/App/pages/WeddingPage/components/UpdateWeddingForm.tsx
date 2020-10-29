import { Col, Form, Input, Row } from 'antd';
import { UpdateWeddingDetailsRequest } from 'App/api/weddings/requests';
import React from 'react';

interface UpdateWeddingFormProps {
	onFinish: (values: UpdateWeddingDetailsRequest) => void;
}

const UpdateWeddingForm: React.FC<UpdateWeddingFormProps> = ({ onFinish }) => {
	return (
		<>
			<Form layout='vertical'>
				<Row justify='space-between'>
					<Col span={10}>
						<Form.Item label='Nazwa wesela' labelAlign='left' name='name'>
							<Input />
						</Form.Item>

						<Form.Item label='Godzina rozpoczęcia wesela' name='hourOfWedding'>
							<Input type='time' />
						</Form.Item>
						<Form.Item label='Godzina rozpoczęcia mszy w kościele' name='hourOfChurchService'>
							<Input type='time' />
						</Form.Item>
						<Form.Item label='Czy będą poprawiny?' name='hasAfters'>
							<Input type='checkbox' />
						</Form.Item>
					</Col>
					<Col span={10}>
						<Form.Item label='Data wesela' name='dateOfWedding'>
							<Input type='date' />
						</Form.Item>
						<Form.Item label='Adres sali weselnej' name='address'>
							<Input type='string' />
						</Form.Item>
						<Form.Item label='Liczba stolików na sali weselnej' name='tablesTotalCount'>
							<Input type='number' />
						</Form.Item>
						<Form.Item label='Dopuszczalny budżet' name='budget'>
							<Input type='number' />
						</Form.Item>
					</Col>
				</Row>
			</Form>
		</>
	);
};

export default UpdateWeddingForm;
