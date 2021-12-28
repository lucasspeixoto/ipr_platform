import SidebarLayout from '@components/layout/SidebarLayout';
import { Navigate } from 'react-router-dom';

import { RouteObject } from 'react-router';
import { Details } from '@pages/Details';
import { Personal } from '@pages/Personal';
import { UserProfile } from '@pages/Profile/index';
import { Supplementary } from '@pages/Supplementary/index';
import { Ecclesiastical } from '@pages/Ecclesiastical/index';

export const adminRoutes: RouteObject[] = [
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
				element: <Supplementary/>,
			},
			{
				path: 'ecclesiastical',
				element: <Ecclesiastical/>,
			},
			{
				path: '*',
				element: <Navigate to='/registration/profile' replace />,
			},
		],
	},
	{
		path: 'admin',
		element: <SidebarLayout />,
		children: [
			{
				path: '',
				element: <Navigate to='/admin/detail' replace />,
			},
			{
				path: 'detail',
				element: <Details />,
			},
			{
				path: 'statistics',
				element: <div>Estatisticas</div>,
			},
			{
				path: 'data',
				element: <div>Dados</div>,
			},
			{
				path: '*',
				element: <Navigate to='/admin/detail' replace />,
			},
		],
	},
	{
		path: 'finance',
		element: <SidebarLayout />,
		children: [
			{
				path: '',
				element: <Navigate to='/finance/detail' replace />,
			},
			{
				path: 'register',
				element: <div>Cadastro de Despensa/Entrada</div>,
			},
			{
				path: 'expenses',
				element: <div>Saídas</div>,
			},
			{
				path: 'gains',
				element: <div>Entradas</div>,
			},
			{
				path: 'dashboards',
				element: <div>Dashboards</div>,
			},
			{
				path: '*',
				element: <Navigate to='/admin/detail' replace />,
			},
		],
	},
	{
		path: '*',
		element: <Navigate to='/registration/profile' replace />,
	},
];
