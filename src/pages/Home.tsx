import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button/Button';
import LayoutMain from '../components/LayoutMain';

function Home() {
  return (
    <LayoutMain>
      <p>Just random placeholder stuff</p>
      <Link to='/login'>Login</Link>
    </LayoutMain>
  );
}

export default Home;
