import React from 'react';
import { Grid } from '@mui/material';

import { IMember } from '@core/types/IMember';
import { ProfileItemCard } from './ProfileItemCard';
import {
  ecclesiasticalKeysNames,
  personalKeysNames,
  supplementaryKeysNames
} from '@core/helpers/ProfileKeysNames';

interface ProfileDataProps {
  user: Partial<IMember>;
}

const ProfileItems = [
  {
    title: 'Dados Pessoais',
    subtitle: 'Listagem com as informações pessoais do membro selecionado.',
    type: 'personal',
    keysNames: personalKeysNames,
  },
  {
    title: 'Dados Complementares',
    subtitle:
      'Listagem com as informações complementares do membro selecionado.',
    type: 'supplementary',
    keysNames: supplementaryKeysNames,
  },
  {
    title: 'Dados Eclesiásticos',
    subtitle: 'Listagem com as informações eclesiásticas do membro selecionado',
    type: 'ecclesiastical',
    keysNames: ecclesiasticalKeysNames,
  }
];

export const ProfileData: React.FC<ProfileDataProps> = ({ user }) => {

  return (
    <React.Fragment>
      <Grid container spacing={2}>
        {ProfileItems.map((item) => (
          <ProfileItemCard
            key={item.title}
            title={item.title}
            subtitle={item.subtitle}
            keysNames={item.keysNames}
            data={user[item.type]}
          />
        ))}
      </Grid>
    </React.Fragment>
  );
};
