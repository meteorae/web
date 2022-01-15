import React from 'react';
import { Col } from 'react-bootstrap';
import styled from 'styled-components';

const SidebarCol = styled(Col)`
  width: 268px !important;
  max-width: 268px !important;
`;

const SidebarInner = styled.div`
  max-width: 260px;
`;

function Sidebar() {
  return (
    <SidebarCol className='p-0 ps-2 pb-2 d-flex flex-column'>
      <SidebarInner className='bg-bars flex-grow-1'>Placeholder</SidebarInner>
    </SidebarCol>
  );
}

export default Sidebar;
