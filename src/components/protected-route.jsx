import { Redirect, Route } from 'react-router-dom';
import React from 'react';
import { useSelector } from 'react-redux';


export default function ProtectedRoute({ children, ...rest }) {
  const { authorization } = useSelector(store => store.auth);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        authorization.user ? (
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
