import { InboxOutlined } from '@ant-design/icons';
import { Modal, notification, Typography } from 'antd';
import { Upload } from 'antd';
import agent from 'App/api/agent';
import PageTitle from 'App/common/components/PageTitle';
import { getGuests } from 'App/state/guests/guests.thunk';
import { RootState } from 'App/state/root.reducer';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const { Dragger } = Upload;

interface UploadGuestsFileModalProps {
	idWedding: number;
	visible: boolean;
	onCancel: () => void;
	onOk: () => void;
}

const UploadGuestsFileModal: React.FC<UploadGuestsFileModalProps> = ({ idWedding, onOk, onCancel, ...props }) => {
	const [sending, setSending] = useState<boolean>();
	const [fileData, setFileData] = useState<any>(null);
	const [fileList, setFileList] = useState<any>([]);
	const dispatch = useDispatch();
	const getGuestsParams = useSelector((state: RootState) => state.guests.guestsQueryParams);

	const handleFileUploadChange = (info) => {
		if (info.file.status !== 'removed' && Object.keys(info).some((val) => val === 'action')) {
			setFileData(info.file);
			setFileList([
				{
					uid: '-1',
					status: 'done',
					name: info.file.name
				}
			]);
		}
	};

	const handleRemoveFile = (file) => {
		setFileList([]);
		setFileData(null);
	};

	const handleCancelClick = () => {
		setFileData(null);
		setFileList([]);
		onCancel();
	};

	const handleFileUploadSubmit = () => {
		if (fileData == null) {
			notification.error({ message: 'Nieprawidłowe dane!', description: 'Plik uszkodzony albo pusty' });
			return;
		}

		setSending(true);
		setFileList((ps) => [
			{
				name: ps[0].name,
				status: 'uploading',
				uid: '-1',
				percent: 25
			}
		]);

		setTimeout(() => {
			let fd = new FormData();
			fd.append('file', fileData);
			agent.Guests.uploadGuestsCsv(idWedding, fd)
				.then(() => {
					setFileList((ps) => [
						{
							name: ps[0].name,
							status: 'uploading',
							uid: '-1',
							percent: 100
						}
					]);
					setTimeout(() => {
						setSending(false);
						setFileList((ps) => [
							{
								name: ps[0].name,
								status: 'success',
								uid: '-1'
							}
						]);
						onOk();
						notification.success({
							message: 'Sukces!',
							description: 'Pomyślnie zapisano gości z pliku!'
						});
						dispatch(getGuests(idWedding, getGuestsParams));
					}, 500);
				})
				.catch(() =>
					notification.error({
						message: 'Niepowodzenie przesyłania danych!',
						description: 'Sprawdź czy zawarte dane są poprawnie wprowadzone'
					})
				);
		}, 1500);
	};

	return (
		<Modal
			{...props}
			closable={false}
			confirmLoading={sending}
			onCancel={handleCancelClick}
			onOk={handleFileUploadSubmit}
		>
			<Dragger
				disabled={sending}
				name='file'
				multiple={false}
				onChange={handleFileUploadChange}
				action={`http://localhost:5000/weddings/${idWedding}/guests/upload`}
				customRequest={handleFileUploadChange}
				fileList={fileList}
				defaultFileList={[]}
				onRemove={handleRemoveFile}
			>
				<PageTitle icon={<InboxOutlined />} title='Import pliku z informacją o gościach' />
				Upuść plik tutaj
			</Dragger>
		</Modal>
	);
};

export default UploadGuestsFileModal;
