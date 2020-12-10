import { Col, DatePicker, Form, Input, Row } from 'antd';
import plPL from 'antd/es/date-picker/locale/pl_PL';
import { FormInstance } from 'antd/lib/form';
import { GetTaskResponse } from 'App/api/taskLists/responses/GetTask';
import { RootState } from 'App/state/root.reducer';
import { mapStateToProps } from 'App/state/utils/connect';
import { isStatusLoading } from 'App/types/requestStatus';
import moment from 'moment';
import React from 'react';
import { connect, DispatchProp } from 'react-redux';

function disabledDate(current) {
	return current && current < moment().endOf('day');
}

interface OwnProps {
	form: FormInstance;
	task: GetTaskResponse;
}

interface UpdateTaskFormProps extends DispatchProp, RootState, OwnProps {}

class UpdateTaskForm extends React.Component<UpdateTaskFormProps, {}> {
	deadlineMoment: moment.Moment;

	constructor(props: UpdateTaskFormProps) {
		super(props);

		this.deadlineMoment = moment(props.task.deadline.toLocaleDateString('pl'), 'DD.MM.YYYY');
	}

	componentWillMount() {
		this.props.form.setFieldsValue({
			deadline: this.deadlineMoment
		});
	}

	render() {
		const { form, task, tasks } = this.props;
		const loading = isStatusLoading(tasks.status.updateTask);

		return (
			<Form layout='vertical' form={form} initialValues={{ deadline: this.deadlineMoment, ...task }}>
				<Form.Item
					label='Zadanie'
					name='description'
					rules={[{ required: true, message: 'Należy podać nazwę zadania!' }]}
				>
					<Input disabled={loading} />
				</Form.Item>
				<Row gutter={8} justify='space-between'>
					<Col span={11}>
						<Form.Item
							label='Termin'
							name='deadline'
							rules={[{ required: true, message: 'Należy podać termin zadania!' }]}
						>
							<DatePicker
								disabled={loading}
								format='DD MMMM YYYY'
								disabledDate={disabledDate}
								locale={plPL}
								style={{ width: '100%' }}
							/>
						</Form.Item>
					</Col>
					<Col span={11}>
						<Form.Item
							label='Osoba odpowiedzialna'
							name='dutyHolderFullName'
							rules={[{ required: true, message: 'Należy podać osobę odpowiedzialną za zadanie!' }]}
						>
							<Input disabled={loading} />
						</Form.Item>
					</Col>
				</Row>
				<Row gutter={8} justify='space-between'>
					<Col span={11}>
						<Form.Item label='Osoba pierwszego kontaktu' name='contactPersonFullName'>
							<Input disabled={loading} />
						</Form.Item>
					</Col>
					<Col span={11}>
						<Form.Item label='Email osoby pierwszego kontaktu' name='contactPersonEmail'>
							<Input disabled={loading} />
						</Form.Item>
					</Col>
				</Row>
				<Row gutter={8} justify='space-between'>
					<Col span={11}>
						<Form.Item label='Telefon osoby pierwszego kontaktu' name='contactPersonPhone'>
							<Input disabled={loading} />
						</Form.Item>
					</Col>
					<Col span={11}>
						<Form.Item label='Koszt' name='cost'>
							<Input disabled={loading} />
						</Form.Item>
					</Col>
				</Row>
				<Form.Item label='Opis' name='notes'>
					<Input.TextArea disabled={loading} />
				</Form.Item>
			</Form>
		);
	}
}

export default connect<RootState, DispatchProp, OwnProps>(mapStateToProps)(UpdateTaskForm);
