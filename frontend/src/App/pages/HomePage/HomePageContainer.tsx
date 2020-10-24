import React from 'react';
import { useSelector } from 'react-redux';

import { Button, Col, Row } from 'antd';
import { RootState } from 'App/state/root.reducer';

import home_screen_wedding from './utils/home_screen_wedding.svg';

const HomePageContainer: React.FC<{}> = () => {
	type MouseClickEvent = (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;

	const state = useSelector((state: RootState) => state);

	const logState: MouseClickEvent = () => {
		console.log(state);
	};

	const getAllCokies: MouseClickEvent = () => {
		console.log(document.cookie.split(';'));
	};

	return (
		<div>
			<Row justify='center' align='middle'>
				<Col span={10}>
					<img style={{ width: '100%' }} src={home_screen_wedding} />
				</Col>
				<Col
					span={24}
					style={{
						textAlign: 'center'
					}}
				>
					<h1 style={{ fontSize: '3rem' }}>Witaj na weddit!</h1>
				</Col>
			</Row>
		</div>
	);
};

export default HomePageContainer;
