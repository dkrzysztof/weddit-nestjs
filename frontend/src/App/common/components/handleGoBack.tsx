import { Button } from 'antd';
import React from 'react';
import { History } from 'history';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router';

const GoToPreviousPageButton: React.FC<{}> = () => {
	const history = useHistory();

	return (
		<Button onClick={() => history.goBack()} icon={<ArrowLeftOutlined />}>
			Powrót
		</Button>
	);
};

export default GoToPreviousPageButton;
