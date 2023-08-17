import React, { useContext } from 'react';
import { StoresContext } from 'context/StoresContext';
import FullScreenLoader from 'components/common/FullScreenLoader/FullScreenLoader';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

type Props = {
  children: React.ReactElement | JSX.Element | JSX.Element[] | null,
};

function ProtectedRoute({ children }: Props) {
  const { authStore } = useContext(StoresContext);

  const navigate = useNavigate();

  if (authStore?.isLoading) {
    return <FullScreenLoader />;
  }

  if (!authStore?.isAuth) {
    navigate('/sign-in');
  }

  return (
    <div>
      { authStore?.isAuth && children }
    </div>
  );
}

export default observer(ProtectedRoute);
