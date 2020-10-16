import React from 'react';
import { Card, Row } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';

interface AllLogsCardProps {
	onDownloadClick: () => void;
}

const AllLogsCard: React.FC<AllLogsCardProps> = ({ onDownloadClick }: AllLogsCardProps) => {
	return (
		<Card bordered={true} title='All logs' className='card card-all-logs'>
			<Row justify='center' align='middle'>
				<DownloadOutlined className='download-icon' onClick={onDownloadClick} />
			</Row>
		</Card>
	);
};

export default AllLogsCard;
