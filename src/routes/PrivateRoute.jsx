import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const isAuthenticated = () => {
  const loggedUser = localStorage.getItem('auth');
  if (!loggedUser) {
    return false;
  }
  const users = getUsersFromStorage();
  const user = JSON.parse(loggedUser);
  const confirmUser = users.find(u => u.user === user.user && u.password === user.password)
  if (!confirmUser && (user.user !== 'admin' || user.password !== 'admin')) {
    localStorage.removeItem('auth');
    return false;
  }
  return true;
};

/**
 * Recupera os usuários do storage.
 */
const getUsersFromStorage = () => {
  const usersStorage = localStorage.getItem('users');
  if (usersStorage) {
    return JSON.parse(usersStorage);
  }
  return [];
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
