import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { APIRequestStatus } from '@/types/store';
import { loginUser } from '@/features/auth/authSlice';
import { useLocation } from 'react-router-dom';
import { push } from 'redux-first-history';
import noop from 'lodash/noop';

import VERSION from '@/utils/version';

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
  const dispatch = useAppDispatch();
  const location = useLocation();

  const { from } = (location.state as { from: { pathName: string } }) || {
    from: { pathName: '/' },
  };

  const loginStatus = useAppSelector((state) => state.auth.status);

  return (
    <Flex h='100%' direction='column'>
      <Center flexGrow='1' w='100%'>
        <Container
          role='main'
          p={8}
          width={'xs'}
          boxShadow='xl'
          bgColor={useColorModeValue('gray.50', 'gray.800')}
          borderRadius='lg'>
          <Heading
            as='h1'
            fontFamily='sans-serif'
            textAlign='center'
            color='red.500'
            mb={8}>
            {t('loginForm.login')}
          </Heading>
          <Formik
            initialValues={{ username: '', password: '' }}
            validationSchema={LoginSchema}
            onSubmit={async ({ username, password }, { setSubmitting }) => {
              try {
                await dispatch(
                  // TODO: Fix this type issue
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-expect-error
                  loginUser({
                    username,
                    password,
                  }),
                ).unwrap();

                dispatch(push(from.pathName));
              } catch (error) {
                noop();
              }
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
                <Center mt={8}>
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
        </Container>
      </Center>
      <Text
        flexGrow='0'
        mb={4}
        size='xs'
        align='center'
        color='gray.500'
        userSelect='none'>
        v{VERSION}
      </Text>
    </Flex>
  );
}

export default Login;
