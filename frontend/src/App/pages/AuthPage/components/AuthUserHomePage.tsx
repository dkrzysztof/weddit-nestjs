import React from 'react';
import { Card, Col, Row } from 'antd';
import { CSSProperties } from 'react';

const cardStyle: CSSProperties = {
	marginBottom: '2em'
};

interface AuthUserHomePageProps {}

const AuthUserHomePage: React.FC<AuthUserHomePageProps> = ({}) => {
	return (
		<Row justify='space-between'>
			<Col xs={24} sm={24} md={11} lg={5} style={cardStyle}>
				<Card hoverable onClick={() => console.log('click')}>
					Wedding Card
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
