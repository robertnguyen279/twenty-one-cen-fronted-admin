import React, { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import LoadingScreen from 'components/LoadingScreen';
import PrivateRoute from 'components/PrivateRoute';

const HomePage = lazy(() => import('pages/Home'));
const DashBoard = lazy(() => import('pages/DashBoard'));

export default (
  <Suspense fallback={<LoadingScreen />}>
    <Switch>
      <Route exact path="/" component={HomePage} />
      <PrivateRoute exact path="/dashboard" component={DashBoard} />
    </Switch>
  </Suspense>
);
