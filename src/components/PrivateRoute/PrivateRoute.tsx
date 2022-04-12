import React, { useEffect, useState } from 'react';
import { Route, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from 'actions/user.action';
import { RootState } from 'reducers/index.reducer';
import LoadingScreen from 'components/LoadingScreen';
import { IPrivateRoute } from 'types';

const PrivateRoute = ({ component, ...rest }: IPrivateRoute): React.ReactElement => {
  const [isLoading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const history = useHistory();

  const user = useSelector((state: RootState) => state.userReducer.user);
  const errorMessage = useSelector((state: RootState) => state.userReducer.errorMessage);

  useEffect(() => {
    if (user) {
      setLoading(false);
    } else {
      dispatch(getUser());
    }
  }, [user]);

  useEffect(() => {
    if (errorMessage) {
      history.push('/');
    } else {
      setLoading(false);
    }
  }, [errorMessage]);

  return isLoading ? <LoadingScreen /> : <Route {...rest} component={component} />;
};

export default PrivateRoute;
