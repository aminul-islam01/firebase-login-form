import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Main from './Layout/Main';
import Home from './Components/Home';
import Register from './Components/Register';
import Login from './Components/Login';
import AuthProviders from './Providers/AuthProviders';
import PrivateRoute from './Routes/PrivateRoute';
import Orders from './Components/Orders';
import About from './Components/About';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>
      },
      {
        path: "register",
        element: <Register></Register>
      },
      {
        path: "login",
        element: <Login></Login>
      },
      {
        path: "orders",
        element: <PrivateRoute><Orders></Orders></PrivateRoute>
      },
      {
        path: "about",
        element: <About></About>
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <AuthProviders>
        <RouterProvider router={router} />
      </AuthProviders>
  </React.StrictMode>,
)
