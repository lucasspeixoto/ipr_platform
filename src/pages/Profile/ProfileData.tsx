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
  step: number;
}

const ProfileItems = [
  {
    title: 'Dados Pessoais',
    subtitle: 'Gerencie suas informações pessoais, mantendo-as atualizadas',
    type: 'personal',
    keysNames: personalKeysNames,
    link: '/registration/personal'
  },
  {
    title: 'Dados Complementares',
    subtitle:
      'Gerencie suas informações complementares, mantendo-as atualizadas',
    type: 'supplementary',
    keysNames: supplementaryKeysNames,
    link: '/registration/supplementary'
  },
  {
    title: 'Dados Eclesiásticos',
    subtitle: 'Gerencie seus dados eclesiásticos, mantendo-as atualizadas',
    type: 'ecclesiastical',
    keysNames: ecclesiasticalKeysNames,
    link: '/registration/ecclesiastical'
  }
];

export const ProfileData: React.FC<ProfileDataProps> = ({ user, step }) => {
  
  return (
    <React.Fragment>
      {step === 4 && (
        <Grid container spacing={2}>
          {ProfileItems.map((item) => (
            <ProfileItemCard
              key={item.title}
              title={item.title}
              subtitle={item.subtitle}
              keysNames={item.keysNames}
              data={user[item.type]}
              link={item.link}
            />
          ))}
        </Grid>
      )}
    </React.Fragment>
  );
};
