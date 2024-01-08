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


const auth = getAuth();

onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log(user);
  } else {
    console.log('no');
    console.log(user);
  }
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <Welcomepage/>,
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
  <RouterProvider  router={router}/>
)
