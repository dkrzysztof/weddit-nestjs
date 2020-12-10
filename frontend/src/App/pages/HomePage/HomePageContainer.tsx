import React from 'react';

import { Col, Row } from 'antd';

import home_screen_logo from './utils/home_screen_wedding.svg';

const HomePageContainer: React.FC<{}> = () => {
	type MouseClickEvent = (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;

	return (
		<Row justify='center' align='middle' className='back-image'>
			<Col
				xs={22}
				sm={22}
				md={20}
				lg={14}
				xl={14}
				xxl={12}
				style={{
					backgroundColor: 'white',
					borderRadius: '0.25rem',
					border: '2px solid #5923ef',
					margin: '2em auto',
					width: 'fit-content',
					boxShadow: '0 12px 18px 0 #333333ae'
				}}
			>
				<Row justify='center' align='middle'>
					<Col span={15}>
						<img style={{ width: '100%', margin: '1em auto' }} alt='tlo strony' src={home_screen_logo} />
					</Col>
					<Col
						span={20}
						style={{
							textAlign: 'center'
						}}
					>
						<h1 style={{ fontSize: '2.5rem', maxWidth: '12em', margin: '1em auto 1em' }}>
							Witaj na Organizerze imprez weselnych!
						</h1>
					</Col>
				</Row>
			</Col>
		</Row>
	);
};

export default HomePageContainer;
