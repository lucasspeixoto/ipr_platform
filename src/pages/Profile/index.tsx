import React from 'react';
import { Helmet } from 'react-helmet-async';

import { Grid, Container } from '@mui/material';

import { ProfileCover } from './ProfileCover';

import Footer from '@components/layout/Footer';
import { useMembers } from '@hooks/useMembers';

export const UserProfile = () => {
  const { activeMember } = useMembers();

  return (
    <>
      {activeMember && (
        <React.Fragment>
          <Helmet>
            <title>Detalhes de membro</title>
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
                <ProfileCover user={activeMember} />
              </Grid>
            </Grid>
          </Container>
          <Footer />
        </React.Fragment>
      )}
    </>
  );
};
