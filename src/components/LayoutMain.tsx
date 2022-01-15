import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

import Navbar from './Navbar';
import Sidebar from './Sidebar';

interface MainLayoutProps {
  children: React.ReactNode;
}

const LayoutMain: React.FC<MainLayoutProps> = (props: MainLayoutProps) => {
  return (
    <Container fluid className='h-100'>
      <Row>
        <Navbar />
      </Row>
      <Row className='d-flex h-100 flex-row'>
        <Sidebar />
        <Col>{props.children}</Col>
      </Row>
    </Container>
  );
};

export default LayoutMain;
