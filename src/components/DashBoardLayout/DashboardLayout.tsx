import React from 'react';
import Header from './Header';
import MenuBar from './MenuBar';
import { IDashBoardLayout } from 'types';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { RootState } from 'reducers/index.reducer';
import { getUser } from 'actions/user.action';
import LoadingScreen from 'components/LoadingScreen';

const DashboardLayout = ({ children }: IDashBoardLayout): React.ReactElement => {
  const [isLoading, setLoading] = React.useState(true);
  const dispatch = useDispatch();
  const history = useHistory();

  const user = useSelector((state: RootState) => state.userReducer.user);
  const getUserError = useSelector((state: RootState) => state.userReducer.getUserError);

  React.useEffect(() => {
    if (user && user.role !== 'user') {
      setLoading(false);
    } else if (user && user.role === user) {
      history.push('/');
    } else {
      dispatch(getUser());
    }
  }, [user]);

  React.useEffect(() => {
    if (getUserError) {
      history.push('/');
    }
  }, [getUserError]);
  return isLoading ? (
    <LoadingScreen />
  ) : (
    <div>
      <Header />
      <div className="body lg:flex">
        <MenuBar />
        <div className="children pt-10 grow">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
