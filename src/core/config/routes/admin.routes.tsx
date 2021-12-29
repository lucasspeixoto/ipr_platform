import SidebarLayout from '@components/layout/SidebarLayout';
import { Navigate } from 'react-router-dom';

import { RouteObject } from 'react-router';
import { List } from '@pages/List';
import { Personal } from '@pages/Personal';
import { UserProfile } from '@pages/Profile/index';
import { Supplementary } from '@pages/Supplementary/index';
import { Ecclesiastical } from '@pages/Ecclesiastical/index';
import { Coming } from '@components/pages/Comming';
import { MemberDetail } from '@pages/MemberDetail';

export const adminRoutes: RouteObject[] = [
  {
    path: 'admin',
    element: <SidebarLayout />,
    children: [
      {
        path: '',
        element: <Navigate to="/admin/list" replace />
      },
      {
        path: 'list',
        element: <List />
      },
      {
        path: 'statistics',
        element: <Coming />
      },
      {
        path: 'data',
        element: <Coming />
      },
      {
        path: 'detail',
        element: <MemberDetail />
      },
      {
        path: '*',
        element: <Navigate to="/admin/list" replace />
      }
    ]
  },
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
        element: <Ecclesiastical />
      },
      {
        path: '*',
        element: <Navigate to="/registration/profile" replace />
      }
    ]
  },
  
  {
    path: 'finance',
    element: <SidebarLayout />,
    children: [
      {
        path: '',
        element: <Navigate to="/finance/detail" replace />
      },
      {
        path: 'register',
        element: <Coming />
      },
      {
        path: 'expenses',
        element: <Coming />
      },
      {
        path: 'gains',
        element: <Coming />
      },
      {
        path: 'dashboards',
        element: <Coming />
      },
      {
        path: '*',
        element: <Navigate to="/admin/detail" replace />
      }
    ]
  },
  {
    path: '*',
    element: <Navigate to="/admin/list" replace />
  }
];
