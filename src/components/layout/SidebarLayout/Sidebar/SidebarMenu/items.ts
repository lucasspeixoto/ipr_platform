export interface MenuItem {
	name: string;
	link: string;
}

export interface MenuItems {
	items: MenuItem[];
	heading: string;
}

const menuItems: MenuItems[] = [
	{
		heading: 'Cadastro',
		items: [
			{
				name: 'Dados Pessoais',
				link: '/registration/personal',
			},
			{
				name: 'Dados Complementares',
				link: '/registration/supplementary',
			},
			{
				name: 'Dados Eclesiásticos',
				link: '/registration/ecclesiastical',
			},
		],
	},
	{
		heading: 'Gestão de Membros',
		items: [
			{
				name: 'Listagem de membros',
				link: '/admin/detail',
			},
			{
				name: 'Estatisticas',
				link: '/admin/statistics',
			},
			{
				name: 'Dados',
				link: '/admin/data',
			},
		],
	},
	{
		heading: 'Controle Financeiro',
		items: [
			{
				name: 'Cadastro',
				link: '/finance/register',
			},
			{
				name: 'Entradas',
				link: '/finance/gains',
			},
			{
				name: 'Saidas',
				link: '/finance/expenses',
			},
			{
				name: 'Dashboards',
				link: '/finance/dashboards',
			},
		],
	},
];

export default menuItems;
