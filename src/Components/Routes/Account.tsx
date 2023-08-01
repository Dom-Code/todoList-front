import React from 'react';
import { Outlet } from 'react-router-dom';

import AccountTabs from './AccountTabs';

export interface RegisterFormProps {
  userEmail: string;
  setUserEmail: React.Dispatch<React.SetStateAction<string>>;
}

export interface LoginProps {
  userEmail: string;
}

const Account = () => {
  return (
    <>
      <AccountTabs />
      <Outlet />
    </>
  );
};

export default Account;

// move form interface to index?
