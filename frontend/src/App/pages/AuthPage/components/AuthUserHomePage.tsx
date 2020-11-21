import React from 'react';
import { Card, Col, Row } from 'antd';
import { CSSProperties } from 'react';
import { CalendarOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router';
import '../styles/AuthUserHomePage.less';

const cardStyle: CSSProperties = {
	marginBottom: '2em'
};

interface AuthUserHomePageProps {}

const AuthUserHomePage: React.FC<AuthUserHomePageProps> = ({}) => {
	const history = useHistory();
	return (
		<Row justify='space-between'>
			<Col xs={24} sm={24} md={11} lg={5} style={cardStyle}>
				<Card
					hoverable
					onClick={() => history.push('/weddings')}
					style={{ paddingRight: '0.1em' }}
					className='card-hover-purple'
				>
					<CalendarOutlined style={{ color: '#5923ef', fontSize: '2em', marginRight: '0.3em' }} /> Plany wesel
				</Card>
			</Col>
			<Col xs={24} sm={24} md={11} lg={5} style={cardStyle}>
				<Card hoverable onClick={() => console.log('click')}></Card>
			</Col>
			<Col xs={24} sm={24} md={11} lg={5} style={cardStyle}>
				<Card hoverable onClick={() => console.log('click')}></Card>
			</Col>
			<Col xs={24} sm={24} md={11} lg={5} style={cardStyle}>
				<Card hoverable onClick={() => console.log('click')}></Card>
			</Col>
		</Row>
	);
};

export default AuthUserHomePage;
