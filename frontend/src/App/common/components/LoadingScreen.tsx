import React, { CSSProperties } from 'react';
import { Col, Row, Spin } from 'antd';

export declare type ContainerType = 'screen' | 'fill';

interface LoadingScreenProps {
	container: ContainerType;
}
const LoadingScreen: React.FC<LoadingScreenProps> = ({ container }: LoadingScreenProps) => {
	let style: CSSProperties = {};
	let styleSpinner: CSSProperties = {};

	if (container === 'screen') {
		style = {
			width: '100vw',
			height: '100vh',
			position: 'absolute',
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			top: 0,
			left: 0,
			zIndex: 999,
			backgroundColor: '#ffffffd0'
		};
	}
	if (container === 'fill') {
		style = {
			width: '100%',
			height: '100%',
			position: 'inherit',
			overflow: 'hidden'
		};
		styleSpinner = {
			margin: '2em auto'
		};
	}

	return (
		<div className='overlay' style={style}>
			<Row justify='center' align='middle'>
				<Col>
					<Spin size='large' style={styleSpinner} />
				</Col>
			</Row>
		</div>
	);
};

export default LoadingScreen;
