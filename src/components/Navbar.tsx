import React from 'react';
import Icon from '@mdi/react';
import { mdiMenu, mdiChevronLeft, mdiMagnify } from '@mdi/js';
import {
  Container,
  Form,
  FormControl,
  InputGroup,
  Nav,
  Navbar,
} from 'react-bootstrap';

function MainNavbar() {
  return (
    <div className='p-2'>
      <Navbar bg='bars'>
        <Container fluid>
          <Nav.Link>
            <Icon path={mdiMenu} size={1} />
          </Nav.Link>
          <Navbar.Brand className='fw-bolder' href='#home'>
            Meteorae
          </Navbar.Brand>
          <Nav.Link>
            <Icon path={mdiChevronLeft} size={1} />
          </Nav.Link>
          <Form className='d-flex'>
            <InputGroup className='d-flex rounded-pill'>
              <InputGroup.Text>
                <Icon path={mdiMagnify} size={0.75} />
              </InputGroup.Text>
              <FormControl
                type='search'
                placeholder='Search'
                className='me-2'
                aria-label='Search'
              />
            </InputGroup>
          </Form>
          <div className='flex-grow-1' />
        </Container>
      </Navbar>
    </div>
  );
}

export default MainNavbar;
