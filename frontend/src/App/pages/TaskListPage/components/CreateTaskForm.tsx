import { DatePicker, Form, Input, InputNumber } from 'antd';
import plPL from 'antd/es/date-picker/locale/pl_PL';
import { FormInstance } from 'antd/lib/form/Form';
import moment, { Moment } from 'moment';
import React from 'react';

interface CreateTaskFormProps {
	form: FormInstance;
	loading: boolean;
}

function disabledDate(current) {
	return current && current < moment().endOf('day');
}

const CreateTaskForm: React.FC<CreateTaskFormProps> = ({ form, loading }) => {
	const handleDateChange = (e: Moment) => {
		console.log(e);
		form.setFieldsValue({
			deadline: e.startOf('day').add(2, 'hours').toISOString()
		});
	};

	return (
		<Form
			form={form}
			layout='vertical'
			initialValues={{
				description: 'Zamówić kwiaty',
				dutyHolderFullName: 'Adam Nowak',
				cost: 120.0
			}}
		>
			<Form.Item label='Treść zadania' name='description' rules={[{ required: true }]}>
				<Input type='text' disabled={loading} />
			</Form.Item>
			<Form.Item label='Termin' name='deadline' rules={[{ required: true }]}>
				<DatePicker
					disabledDate={disabledDate}
					format='DD MMMM YYYY'
					style={{ width: '100%' }}
					locale={plPL}
					onChange={handleDateChange}
				/>{' '}
			</Form.Item>
			<Form.Item label='Osoba odpowiedzialna' name='dutyHolderFullName' rules={[{ required: true }]}>
				<Input type='text' disabled={loading} />
			</Form.Item>
			<Form.Item label='koszt' name='cost' rules={[{ required: true }]}>
				<InputNumber type='number' min={0} step={50} precision={2} disabled={loading} />
			</Form.Item>
			<Form.Item label='Osoba, z którą należy się kontaktować' name='contactPersonFullName'>
				<Input type='text' disabled={loading} />
			</Form.Item>
			<Form.Item label='Telefon do osoby kontaktowej' name='contactPersonPhone'>
				<Input type='text' disabled={loading} />
			</Form.Item>
			<Form.Item label='Email osoby kontaktowej' name='contactPersonEmail'>
				<Input type='text' disabled={loading} />
			</Form.Item>
			<Form.Item label='Notatki' name='notes'>
				<Input.TextArea disabled={loading} />
			</Form.Item>
		</Form>
	);
};

export default CreateTaskForm;
