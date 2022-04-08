import React, { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';

const HomePage = lazy(() => import('pages/Home'));

export default (
  <Suspense fallback={<div>Loading</div>}>
    <Switch>
      <Route exact path="/" component={HomePage} />
    </Switch>
  </Suspense>
);
