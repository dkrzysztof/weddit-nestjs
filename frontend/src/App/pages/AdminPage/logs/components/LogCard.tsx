import React from 'react';

import Moment from 'react-moment';
import { Card, Row } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';

import { LogForGetLogsFilesResponse } from 'App/api/logs/responses';

interface LogCardProps {
	log: LogForGetLogsFilesResponse;
	activeCardIndex: number;
	index: number;
	onCardClick: (name: string, index: number) => () => void;
	onDownloadClick: (name: string) => () => void;
}

const LogCard: React.FC<LogCardProps> = ({
	log,
	activeCardIndex,
	index,
	onCardClick,
	onDownloadClick
}: LogCardProps) => {
	let cardClasses = activeCardIndex === index ? 'active-card card' : 'card';

	return (
		<Card
			bordered={true}
			title={
				<Moment format='D MMM YYYY' local withTitle>
					{log.date}
				</Moment>
			}
			className={cardClasses}
			onClick={onCardClick(log.name, index)}
			key={index}
		>
			<Row justify='center' align='middle'>
				<DownloadOutlined className='download-icon' onClick={onDownloadClick(log.name)} />
			</Row>
		</Card>
	);
};

export default LogCard;
