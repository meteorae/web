import { useTranslation } from 'react-i18next';
import { Formik } from 'formik';
import { object, string } from 'yup';

import LayoutDialog from '../components/LayoutDialog';
import TextInput from '../components/TextInput/TextInput';
import { ButtonPrimary } from '../components/Button';

const LoginTitle = styled.h1`
  font-size: ${themeGet('fontSizes.5')};
  color: ${themeGet('colors.primary')};
  font-weight: ${themeGet('fontWeights.black')};
  margin: 0;
  padding: 0;
  user-select: none;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
`;

const LoginInputContainer = styled.div`
  padding: ${themeGet('space.2')};
`;

const LoginFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${themeGet('fontSizes.1')};
  color: ${themeGet('colors.muted')};
  user-select: none;
`;

const loginValidationSchema = object().shape({
  username: string().required('Username is required'),
  password: string().required('Password is required'),
});

function Home() {
  const { t } = useTranslation();

  return (
    <LayoutDialog>
      <LoginTitle>Meteorae</LoginTitle>
      <Formik
        initialValues={{ username: '', password: '' }}
        onSubmit={() => {}}
        validationSchema={loginValidationSchema}>
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <LoginForm onSubmit={handleSubmit}>
            <LoginInputContainer>
              <TextInput
                name='username'
                placeholder={t('loginForm.username')}
                onChange={handleChange}
                onBlur={handleBlur}
                validationStatus={
                  errors.username && touched.username ? 'error' : undefined
                }
                value={values.username}
              />
            </LoginInputContainer>
            <LoginInputContainer>
              <TextInput
                name='password'
                type='password'
                placeholder={t('loginForm.password')}
                onChange={handleChange}
                onBlur={handleBlur}
                validationStatus={
                  errors.password && touched.password ? 'error' : undefined
                }
                value={values.password}
              />
            </LoginInputContainer>
            <LoginInputContainer>
              <ButtonPrimary type='submit'>
                {t('loginForm.login')}
              </ButtonPrimary>
            </LoginInputContainer>
          </LoginForm>
        )}
      </Formik>
      <LoginFooter>v1.0.0</LoginFooter>
    </LayoutDialog>
  );
}

export default Home;
