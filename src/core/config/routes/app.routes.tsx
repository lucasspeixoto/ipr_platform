import SidebarLayout from '@components/layout/SidebarLayout';
import { Navigate } from 'react-router-dom';

import { RouteObject } from 'react-router';
import { Resume } from '@pages/Resume';
import PageTitleWrapper from '@components/pages/PageTitleWrapper';
import { Helmet } from 'react-helmet-async';

export const appRoutes: RouteObject[] = [
	{
		path: 'registration',
		element: <SidebarLayout />,
		children: [
			{
				path: '',
				element: <Navigate to='/registration/resume' replace />,
			},
			{
				path: 'resume',
				element: (
					<>
						<Helmet>
							<title>Cadastro - Resumo</title>
						</Helmet>
						<PageTitleWrapper>
							<div>Resumo</div>
						</PageTitleWrapper>
					</>
				),
			},
			{
				path: 'personal',
				element: (
					<>
						<Helmet>
							<title>Cadastro - Dados Pessoais</title>
						</Helmet>
						<PageTitleWrapper>
							<div>Dados Pessoais</div>
						</PageTitleWrapper>
					</>
				),
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
				element: <Navigate to='/registration/resume' replace />,
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
				element: <Resume />,
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
		element: <Navigate to='/registration/resume' replace />,
	},
];
