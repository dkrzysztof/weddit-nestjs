import { Input, Select } from 'antd';
import { Form } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import { CreateGuestRequest } from 'App/api/guests/requests';
import { RootState } from 'App/state/root.reducer';
import React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';

interface CreateGuestFormProps {
	visible: boolean;
	onCreate: (values: CreateGuestRequest) => void;
	onCancel: () => void;
}

const CreateGuestForm: React.FC<CreateGuestFormProps> = ({ visible, onCreate, onCancel }) => {
	const [form] = Form.useForm();

	const [checkedConfirm, setCheckedConfirm] = useState<boolean>(false);
	const [checkedAfters, setCheckedAfters] = useState<boolean>(false);
	const guestTypes = useSelector((state: RootState) => state.guests.guestTypes);

	let idGuestType = null;
	if (guestTypes) {
		let adult = guestTypes.find((val) => val.idGuestType === 6);
		idGuestType = adult.idGuestType;
	}

	const handleOk = (values: any) => {
		form.validateFields().then((values) => {
			form.resetFields();

			values.confirmed = checkedConfirm;
			values.confirmedAfters = checkedAfters;

			onCreate(values as CreateGuestRequest);
		});
	};

	return (
		<Modal
			visible={visible}
			title='Create a new collection'
			okText='Create'
			cancelText='Cancel'
			onCancel={onCancel}
			onOk={handleOk}
		>
			<Form form={form} layout='vertical' initialValues={{ idGuestType }}>
				<Form.Item
					name='firstName'
					label='Imię'
					rules={[{ required: true, message: 'Należy podać imię gościa!' }]}
				>
					<Input type='text' />
				</Form.Item>
				<Form.Item
					name='lastName'
					label='Nazwisko'
					rules={[{ required: true, message: 'Należy podać nazwisko gościa!' }]}
				>
					<Input type='text' />
				</Form.Item>
				<Form.Item label='Czy potwierdził zaproszenie?' name='confirmed'>
					<Input
						type='checkbox'
						checked={checkedConfirm}
						onChange={() => setCheckedConfirm(!checkedConfirm)}
					/>
				</Form.Item>
				<Form.Item label='Czy potwierdził obecność na poprawinach?' name='confirmedAfters'>
					<Input type='checkbox' checked={checkedAfters} onChange={() => setCheckedAfters(!checkedAfters)} />
				</Form.Item>
				<Form.Item name='idGuestType' rules={[{ required: true, message: 'Należy wybrać grupę użytkownika!' }]}>
					<Select placeholder='Rodzaj uczestnika weselnego'>
						{guestTypes &&
							guestTypes.map((gt) => (
								<Select.Option key={gt.idGuestType} value={gt.idGuestType}>
									{gt.name}
								</Select.Option>
							))}
					</Select>
				</Form.Item>
			</Form>
		</Modal>
	);
};

export default CreateGuestForm;
