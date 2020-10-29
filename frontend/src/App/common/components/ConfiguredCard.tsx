import { Card } from 'antd';
import React, { CSSProperties } from 'react';

interface ConfiguredCardProps {
	onClick?: () => void;
}

const cardStyle: CSSProperties = {
	marginBottom: '1em'
};

const ConfiguredCard: React.FC<ConfiguredCardProps> = ({ onClick, children }) => {
	return (
		<Card hoverable onClick={onClick} style={cardStyle}>
			{children}
		</Card>
	);
};

export default ConfiguredCard;
