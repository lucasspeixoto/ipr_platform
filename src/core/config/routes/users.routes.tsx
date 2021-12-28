import SidebarLayout from '@components/layout/SidebarLayout';
import { Navigate } from 'react-router-dom';

import { RouteObject } from 'react-router';
import { Personal } from '@pages/Personal';
import { UserProfile } from '@pages/Profile/index';

export const usersRoutes: RouteObject[] = [
	{
		path: 'registration',
		element: <SidebarLayout />,
		children: [
			{
				path: '',
				element: <Navigate to='/registration/profile' replace />,
			},
			{
				path: 'profile',
				element: (
					<UserProfile/>
				),
			},
			{
				path: 'personal',
				element: <Personal />,
			},
			{
				path: 'supplementary',
				element: <div>Complementares</div>,
			},
			{
				path: 'ecclesiastical',
				element: <div>Eclesiásticos</div>,
			},
			{
				path: '*',
				element: <Navigate to='/registration/profile' replace />,
			},
		],
	},
	{
		path: '*',
		element: <Navigate to='/registration/profile' replace />,
	},
];
