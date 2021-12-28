
const ProfileItems = [
  {
    title: 'Dados Pessoais',
    subtitle: 'Gerencie suas informações pessoais, mantendo-as atualizadas',
    type: 'personal',

    link: '/registration/personal'
  },
  {
    title: 'Dados Complementares',
    subtitle:
      'Gerencie suas informações complementares, mantendo-as atualizadas',
    type: 'supplementary',

    link: '/registration/supplementary'
  },
  {
    title: 'Dados Eclesiásticos',
    subtitle: 'Gerencie seus dados eclesiásticos, mantendo-as atualizadas',
    type: 'ecclesiastical',

    link: '/registration/ecclesiastical'
  }
];

console.log(ProfileItems.splice(0,3));
