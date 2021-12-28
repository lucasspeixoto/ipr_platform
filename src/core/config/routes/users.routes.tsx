import SidebarLayout from '@components/layout/SidebarLayout';
import { Navigate } from 'react-router-dom';

import { RouteObject } from 'react-router';
import { Personal } from '@pages/Personal';
import { UserProfile } from '@pages/Profile/index';
import { Supplementary } from '@pages/Supplementary';
import { Ecclesiastical } from '@pages/Ecclesiastical';

export const usersRoutes: RouteObject[] = [
  {
    path: 'registration',
    element: <SidebarLayout />,
    children: [
      {
        path: '',
        element: <Navigate to="/registration/profile" replace />
      },
      {
        path: 'profile',
        element: <UserProfile />
      },
      {
        path: 'personal',
        element: <Personal />
      },
      {
        path: 'supplementary',
        element: <Supplementary />
      },
      {
        path: 'ecclesiastical',
        element: <Ecclesiastical/>,
      },
      {
        path: '*',
        element: <Navigate to="/registration/profile" replace />
      }
    ]
  },
  {
    path: '*',
    element: <Navigate to="/registration/profile" replace />
  }
];
