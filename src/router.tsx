import React, { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import LoadingScreen from 'components/LoadingScreen';
import Statistics from 'components/StatisticPage';
import UserPage from 'components/UserPage';
import ProductPage from 'components/ProductPage';
import OrderPage from 'components/OrderPage';

const HomePage = lazy(() => import('components/Home'));
const DashBoardLayout = lazy(() => import('components/DashBoardLayout'));

export default (
  <Suspense fallback={<LoadingScreen />}>
    <Switch>
      <Route exact path="/" component={HomePage} />
      <DashBoardLayout>
        <Route exact path="/dashboard" component={Statistics} />
        <Route exact path="/dashboard/users" component={UserPage} />
        <Route exact path="/dashboard/products" component={ProductPage} />
        <Route exact path="/dashboard/orders" component={OrderPage} />
      </DashBoardLayout>
    </Switch>
  </Suspense>
);
