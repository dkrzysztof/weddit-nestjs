import { Card } from 'antd';
import React, { CSSProperties } from 'react';

interface ConfiguredCardProps {
	onClick?: () => void;
	className: string;
}

const cardStyle: CSSProperties = {
	marginBottom: '1em'
};

const ConfiguredCard: React.FC<ConfiguredCardProps> = ({ onClick, children, className }) => {
	return (
		<Card onClick={onClick} style={cardStyle} className={className}>
			{children}
		</Card>
	);
};

export default ConfiguredCard;
