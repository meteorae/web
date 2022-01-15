import React, { useState } from 'react';
import { motion } from 'framer-motion';
import OnboardingStep from '../../components/OnboardingStep';
import { Form } from 'react-bootstrap';
import { gql, useMutation } from '@apollo/client';

const CREATE_USER_MUTATION = gql`
  mutation RegisterAccount($username: String!, $password: String!) {
    registerAccount(username: $username, password: $password) {
      token
    }
  }
`;

interface OnboardingStep2Props {
  onClickNext: () => void;
  onClickBack: () => void;
}

// TODO: This needs form validation
const Step2: React.FC<OnboardingStep2Props> = (props: OnboardingStep2Props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [addAccount, { data, loading, error }] =
    useMutation(CREATE_USER_MUTATION);

  async function onClickNext() {
    await addAccount({
      variables: {
        username,
        password,
      },
    });

    props.onClickNext();
  }

  return (
    <motion.div
      className='p-3 h-100'
      initial={{ opacity: 0, x: '100%' }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: '-100%' }}>
      <OnboardingStep
        title='Administrator'
        titleRed='Account'
        onClickBack={props.onClickBack}
        onClickNext={onClickNext}>
        <p>
          This account will allow you to create libraries,
          <br />
          manage users and configure your server
        </p>
        <Form>
          <Form.Control
            className='mb-3'
            placeholder='Username'
            onChange={(e) => setUsername(e.target.value)}
          />
          <Form.Control
            className='mb-3'
            type='password'
            placeholder='Password'
            onChange={(e) => setPassword(e.target.value)}
          />
          <Form.Control type='password' placeholder='Confirm Password' />
        </Form>
      </OnboardingStep>
    </motion.div>
  );
};

export default Step2;
