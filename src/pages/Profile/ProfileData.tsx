import { Grid } from '@mui/material';

import { IMember } from '@core/types/IMember';
import { ProfileItemCard } from './ProfileItemCard';
import {
  ecclesiasticalKeysNames,
  personalKeysNames,
  supplementaryKeysNames
} from '@core/helpers/ProfileKeysNames';

interface ProfileDataProps {
  data: Partial<IMember>;
}

const ProfileItems = [
  {
    title: 'Dados Pessoais',
    subtitle: 'Gerencie suas informações pessoais, mantendo-as atualizadas',
    type: 'personal',
    keysNames: personalKeysNames,
    link:"/registration/personal"
  },
  {
    title: 'Dados Complementares',
    subtitle:
      'Gerencie suas informações complementares, mantendo-as atualizadas',
    type: 'supplementary',
    keysNames: supplementaryKeysNames,
    link:"/registration/supplementary"
  },
  {
    title: 'Dados Eclesiásticos',
    subtitle: 'Gerencie seus dados eclesiásticos, mantendo-as atualizadas',
    type: 'ecclesiastical',
    keysNames: ecclesiasticalKeysNames,
    link:"/registration/ecclesiastical"
  }
];

export const ProfileData: React.FC<ProfileDataProps> = ({ data }) => {
  return (
    <Grid container spacing={2}>
      {ProfileItems.map((item) => (
        <ProfileItemCard
          key={item.title}
          title={item.title}
          subtitle={item.subtitle}
          keysNames={item.keysNames}
          data={data[item.type]}
          link={item.link}
        />
      ))}
    </Grid>
  );
};
