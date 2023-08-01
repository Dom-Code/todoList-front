import React, { useState, createContext } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import ErrorPage from './Components/Error-Page';
import Account from './Components/Routes/Account';
import TodoListMain from './Components/Routes/TodoListMain';
import Home from './Components/Routes/Home';
import Navigation from './Components/Nav';
import Login from './Components/Routes/Login';
import Register from './Components/Routes/Register';
import Logout from './Components/Routes/Logout';

export interface IList {
  name: string;
  createAt: string;
  todos: Array<any>;
  user_id: string;
  __v: number;
  _id: string;
  updatedAt: string | null;
}
export interface IValidation {
  accessToken: String;
  setAccessToken: React.Dispatch<React.SetStateAction<String>>;
  isValid: boolean;
  setIsValid: React.Dispatch<React.SetStateAction<any>>;
  lists: Array<any>;
  setLists: React.Dispatch<React.SetStateAction<Array<IList>>>;
  todos: Array<any>;
  setTodos: React.Dispatch<React.SetStateAction<Array<any>>>;
}

const defaultContext = {
  accessToken: '',
  setAccessToken: () => {},
  isValid: false,
  setIsValid: () => {},
  lists: [],
  setLists: () => {},
  todos: [],
  setTodos: () => {},
};

export const ValidationContext = createContext<IValidation>(defaultContext);

const App = () => {
  const [accessToken, setAccessToken] = useState<String>('');
  const [isValid, setIsValid] = useState<boolean>(false);
  const [lists, setLists] = useState<Array<IList>>([]);
  const [todos, setTodos] = useState<Array<{}>>([]);
  const context = {
    accessToken,
    setAccessToken,
    isValid,
    setIsValid,
    lists,
    setLists,
    todos,
    setTodos,
  };

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Navigation />,
      errorElement: <ErrorPage />,

      children: [
        { index: true, element: <Home /> },
        { path: 'todolists', element: <TodoListMain /> },
        {
          path: 'account',
          element: <Account />,
          errorElement: <ErrorPage />,
          children: [
            { path: 'login', element: <Login /> },
            { path: 'register', element: <Register /> },
            { path: 'logout', element: <Logout /> },
          ],
        },
      ],
    },
  ]);

  return (
    <div className='App'>
      <ValidationContext.Provider value={context}>
        <RouterProvider router={router} />
      </ValidationContext.Provider>
      {/* <div>
        <Navigation validated={validated} setValidated={setValidated} />
        <Outlet />
      </div> */}
    </div>
  );
};

export default App;
