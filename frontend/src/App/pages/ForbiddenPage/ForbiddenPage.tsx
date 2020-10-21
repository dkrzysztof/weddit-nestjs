import { Button, Result } from 'antd';
import React from 'react';
import { RouteComponentProps } from 'react-router';

interface ForbiddenPageProps extends RouteComponentProps {}

const ForbiddenPage: React.FC<ForbiddenPageProps> = ({ history }) => {
	const handleGoBackClick = () => history.goBack();

	return (
		<Result
			status='403'
			title='403'
			subTitle='Przykro nam, ale nie masz dostępu do tego zasobu.'
			extra={
				<Button type='primary' onClick={handleGoBackClick}>
					Wstecz
				</Button>
			}
		/>
	);
};

export default ForbiddenPage;
