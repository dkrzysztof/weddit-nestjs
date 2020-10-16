import React from 'react';
import { Result, Button } from 'antd';
import { RouteComponentProps } from 'react-router';

interface NotFoundPageContainerProps extends RouteComponentProps {}

const NotFoundPageContainer: React.FC<NotFoundPageContainerProps> = ({ history }: NotFoundPageContainerProps) => {
	const buttonGoBackHomeOnClick = () => history.push('/');
	return (
		<Result
			status='404'
			title='404'
			subTitle='Przykro nam, ale taka strona nie istnieje.'
			extra={
				<Button type='primary' onClick={buttonGoBackHomeOnClick}>
					Wróć do strony głównej
				</Button>
			}
		></Result>
	);
};

export default NotFoundPageContainer;
