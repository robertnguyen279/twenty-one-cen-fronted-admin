import React, { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import LoadingScreen from 'components/LoadingScreen';
import PrivateRoute from 'components/PrivateRoute';
import Statistics from 'pages/Statistics';
import Users from 'pages/Users';
import Products from 'pages/Products';

const HomePage = lazy(() => import('pages/Home'));
const DashBoardLayout = lazy(() => import('components/DashBoardLayout'));

export default (
  <Suspense fallback={<LoadingScreen />}>
    <Switch>
      <Route exact path="/" component={HomePage} />
      <DashBoardLayout>
        <PrivateRoute exact path="/dashboard" component={Statistics} />
        <PrivateRoute exact path="/dashboard/users" component={Users} />
        <PrivateRoute exact path="/dashboard/products" component={Products} />
      </DashBoardLayout>
    </Switch>
  </Suspense>
);
