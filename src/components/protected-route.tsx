import { Redirect, Route } from 'react-router-dom';
import React, { FC, ReactNode } from 'react';
import { useSelector } from '../services/hooks';


const ProtectedRoute: FC<{children: ReactNode; path: string }> = ({ children, ...rest }) => {
  const { authorization } = useSelector(store => store.auth);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        authorization?.user ? (
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

export default ProtectedRoute;
