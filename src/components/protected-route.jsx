import { Redirect, Route } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';


export function ProtectedRoute({ children, ...rest }) {
  const { authorization } = useSelector(store => store.auth);

  return (
    <Route
      {...rest}
      render={() =>
        authorization.user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
            }}
          />
        )
      }
    />
  );
}
