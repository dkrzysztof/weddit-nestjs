import { Button } from 'antd';
import React from 'react';
import { History } from 'history';
import { ArrowLeftOutlined } from '@ant-design/icons';

interface GoToPreviousPageButtonProps {
	history: History;
}

const GoToPreviousPageButton: React.FC<GoToPreviousPageButtonProps> = ({ history }) => {
	return (
		<Button onClick={() => history.goBack()} icon={<ArrowLeftOutlined />}>
			Powrót
		</Button>
	);
};

export default GoToPreviousPageButton;
