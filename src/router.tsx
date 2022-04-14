import React, { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import LoadingScreen from 'components/LoadingScreen';
import PrivateRoute from 'components/PrivateRoute';

const HomePage = lazy(() => import('pages/Home'));
const DashBoardLayout = lazy(() => import('components/DashBoardLayout'));
const Statistics = lazy(() => import('pages/Statistics'));

export default (
  <Suspense fallback={<LoadingScreen />}>
    <Switch>
      <Route exact path="/" component={HomePage} />
      <DashBoardLayout>
        <PrivateRoute exact path="/dashboard" component={Statistics} />
      </DashBoardLayout>
    </Switch>
  </Suspense>
);
