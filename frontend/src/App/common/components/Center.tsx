import React from 'react';
import { Row, Col } from 'antd';

export declare type SizeType = 'small' | 'medium' | 'large';

interface CenterProps {
	size: SizeType;
	children?: React.ReactNode;
}

const Center: React.FC<CenterProps> = ({ children, size }) => {
	if (size === 'small') {
		return (
			<Row align='middle' justify='center'>
				<Col xs={22} md={14} xl={10} xxl={8}>
					{children}
				</Col>
			</Row>
		);
	}
	if (size === 'medium') {
		return (
			<Row align='middle' justify='center'>
				<Col xs={22} md={18} xl={12} xxl={10}>
					{children}
				</Col>
			</Row>
		);
	}

	return (
		<Row align='middle' justify='center'>
			<Col xs={22} md={20} xl={14} xxl={12}>
				{children}
			</Col>
		</Row>
	);
};

export default Center;
