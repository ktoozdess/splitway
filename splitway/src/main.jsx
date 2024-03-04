import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Welcomepage from './components/views/welcomepage/Welcomepage.jsx'
import Home from './components/views/homepage/homepage.jsx'
import './index.css'
import './assets/styles/global.css'
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { ProtectedRoute } from './components/ProtectedRoute.jsx';
import FeedPage from './components/views/feed/feed.jsx';
import Creategroup from './components/creategroup/CreateGroup.jsx';
import Group from './components/views/GroupView/Group.jsx';
import { AuthContext } from './context/AuthContext.jsx';
import { UnProtectedRoute } from './components/UnProtectedRoute.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <UnProtectedRoute><Welcomepage/></UnProtectedRoute>,
  },
  {
    path: "/homepage",
    element: <ProtectedRoute><Home/></ProtectedRoute>,
  },
  {
    path: "/feed",
    element: <ProtectedRoute><FeedPage/></ProtectedRoute>,
  },
  {
    path: "/creategroup",
    element: <ProtectedRoute><Creategroup/></ProtectedRoute>,
  },
  {
    path: "/group/:id",
    element: <ProtectedRoute><Group/></ProtectedRoute>,
  },

]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthContext>
    <RouterProvider  router={router}/>
  </AuthContext>

)
