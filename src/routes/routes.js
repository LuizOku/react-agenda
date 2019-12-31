import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Login from '../pages/Login';
import Agenda from '../pages/Agenda';
import Users from '../pages/Users';

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={() => <Login />} />
      <PrivateRoute exact path="/agenda/:user" component={() => <Agenda />} />
      <Route exact path="/agenda" component={() => <Agenda />} />
      <Route exact path="/users" component={() => <Users />} />
      <Route component={() => <h1>404</h1>} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
