import { Navigate, NavigateProps } from 'react-router-dom';
import { useAppSelector } from '@/app/hooks';

interface ProtectedRouteProps {
  children: JSX.Element;
  redirectTo: NavigateProps['to'];
}

/**
 * Protects a route behind a login check
 *
 * @param {ProtectedRouteProps} { children, redirectTo } - The properties of the component
 * @returns The protected route or a redirect
 */
function RequireAuth({ children, redirectTo }: ProtectedRouteProps) {
  const user = useAppSelector((state) => state.auth.user);

  return user ? children : <Navigate to={redirectTo} />;
}

export default RequireAuth;
