import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const isAuthenticated = () => {
  const loggedUser = localStorage.getItem('auth');
  if (!loggedUser) {
    return false;
  }
  const user = JSON.parse(loggedUser);
  if (user.user !== 'admin' || user.password !== 'admin') {
    localStorage.removeItem('auth');
    return false;
  }
  return true;
};

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: '/', state: { from: props.location } }} />
      )
    }
  />
);

export default PrivateRoute;
