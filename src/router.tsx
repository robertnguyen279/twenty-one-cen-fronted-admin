import React, { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import LoadingScreen from 'components/LoadingScreen';

const HomePage = lazy(() => import('pages/Home'));

export default (
  <Suspense fallback={<LoadingScreen />}>
    <Switch>
      <Route exact path="/" component={HomePage} />
    </Switch>
  </Suspense>
);
