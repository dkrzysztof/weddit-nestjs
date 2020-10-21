import React from 'react'
import { Row, Col } from 'antd';

interface CenterProps {
    children?: React.ReactNode;
}

const Center: React.FC<CenterProps> = ({children}) => {
    return <Row align='middle' justify='center'>
        <Col xs={22} md={14} xl={10} xxl={8}>
            {children}
        </Col>
    </Row>
}

export default Center;