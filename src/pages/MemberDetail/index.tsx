import React from 'react';
import { Helmet } from 'react-helmet-async';

import { Grid, Container } from '@mui/material';

import { ProfileCover } from './ProfileCover';

import Footer from '@components/layout/Footer';
import { useMembers } from '@hooks/useMembers';
import { SuspenseLoader } from '@components/pages/SuspenseLoader/index';
import { ProfileData } from './ProfileData';

export const MemberDetail: React.FC = () => {
  const { selectedMember } = useMembers();

  return (
    <>
      {selectedMember ? (
        <React.Fragment>
          <Helmet>
            <title>Meu Perfil</title>
          </Helmet>

          <Container sx={{ mt: 3 }} maxWidth="xl">
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={3}
            >
              <Grid item xs={12} md={10}>
                <ProfileCover user={selectedMember} />
              </Grid>
              <Grid item xs={12} md={10}>
                <ProfileData user={selectedMember} />
              </Grid>
            </Grid>
          </Container>
          <Footer />
        </React.Fragment>
      ) : (
        <SuspenseLoader />
      )}
    </>
  );
};
