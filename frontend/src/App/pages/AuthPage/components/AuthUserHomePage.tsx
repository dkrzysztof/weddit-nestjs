import React from 'react';
import { Card, Col, Row } from 'antd';
import { CSSProperties } from 'react';
import { CalendarOutlined, PlusOutlined, PlusSquareOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router';
import '../styles/AuthUserHomePage.less';

const colStyle: CSSProperties = {
	marginBottom: '2em'
};

const cardStyle: CSSProperties = {
	paddingRight: '0.1em',
	height: '100%',
	width: '100%',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	textAlign: 'center'
};

const contentStyle: CSSProperties = { color: '#5923ef', fontSize: '1.8em', marginRight: '0.3em' };

const cardTextStyle: CSSProperties = {
	fontSize: '1.8em'
};

interface AuthUserHomePageProps {}

const AuthUserHomePage: React.FC<AuthUserHomePageProps> = ({}) => {
	const history = useHistory();
	return (
		<Row justify='space-between' style={{ minHeight: '200px' }}>
			<Col xs={24} sm={24} md={11} lg={11} style={colStyle}>
				<Card
					hoverable
					onClick={() => history.push('/weddings')}
					style={cardStyle}
					className='card-hover-purple'
				>
					<CalendarOutlined style={contentStyle} />
					<span style={cardTextStyle}>Twoje plany wesel</span>
				</Card>
			</Col>
			<Col xs={24} sm={24} md={11} lg={11} style={colStyle}>
				<Card
					hoverable
					onClick={() => history.push('/weddings/create')}
					style={cardStyle}
					className='card-hover-green'
				>
					<PlusSquareOutlined style={{ ...contentStyle, color: '#59cf7a' }} />
					<span style={cardTextStyle}>Stwórz nowy plan weselny</span>
				</Card>
			</Col>
		</Row>
	);
};

export default AuthUserHomePage;
