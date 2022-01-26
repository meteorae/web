import {
  Box,
  Button,
  Center,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
} from '@chakra-ui/react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../app/hooks';
import { APIRequestStatus } from '../types/store';
import { useDispatch } from 'react-redux';
import { loginUser } from '../features/auth/authSlice';
import { useLocation, useNavigate } from 'react-router-dom';

const LoginSchema = Yup.object().shape({
  username: Yup.string().required('Required'),
  password: Yup.string().required('Required'),
});

/**
 * Login page
 *
 * @returns The login page component
 */
function Login() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { from } = (location.state as { from: { pathName: string } }) || {
    from: { pathName: '/' },
  };

  const loginStatus = useAppSelector((state) => state.auth.status);

  return (
    <Container>
      <Center>
        <Box p={4} width={'xs'}>
          <Heading>Login</Heading>
          <Formik
            initialValues={{ username: '', password: '' }}
            validationSchema={LoginSchema}
            onSubmit={async ({ username, password }, { setSubmitting }) => {
              dispatch(
                loginUser({
                  data: { username, password },
                  from: from.pathName,
                  navigate,
                }),
              );
              setSubmitting(false);
            }}>
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
            }) => (
              <form onSubmit={handleSubmit}>
                <Box>
                  <FormControl
                    mb={4}
                    isInvalid={!!(errors.username && touched.username)}>
                    <FormLabel htmlFor='username'>
                      {t('loginForm.username')}
                    </FormLabel>
                    <Input
                      id='username'
                      placeholder={t('loginForm.username')}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.username}
                    />
                    {errors.username && touched.username ? (
                      <FormErrorMessage>Username is required.</FormErrorMessage>
                    ) : null}
                  </FormControl>
                  <FormControl
                    mb={4}
                    isInvalid={!!(errors.password && touched.password)}>
                    <FormLabel htmlFor='password'>
                      {t('loginForm.password')}
                    </FormLabel>
                    <Input
                      id='password'
                      type='password'
                      placeholder={t('loginForm.password')}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                    />
                    {errors.password && touched.password ? (
                      <FormErrorMessage>Password is required.</FormErrorMessage>
                    ) : null}
                  </FormControl>
                </Box>
                <Center>
                  <Button
                    type='submit'
                    colorScheme='red'
                    isLoading={
                      isSubmitting || loginStatus === APIRequestStatus.Pending
                    }>
                    {t('loginForm.login')}
                  </Button>
                </Center>
              </form>
            )}
          </Formik>
        </Box>
      </Center>
    </Container>
  );
}

export default Login;
