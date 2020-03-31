import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import useAuthentication from '../../hooks/useAuthentication';

export default function AuthorizedRoute({
  id,
  path,
  exact,
  strict,
  isPublic,
  children,
  ...rest
}) {
  const { isAuthenticated } = useAuthentication();
  const authorized = isPublic === true || isAuthenticated;
  return (
    <Route
      {...rest}
      key={id}
      path={path}
      exact={exact}
      strict={strict}
      render={({ location }) =>
        authorized ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}