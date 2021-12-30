import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

import { Grid, Container } from '@mui/material';

import { ProfileCover } from './ProfileCover';

import Footer from '@components/layout/Footer';
import { useMembers } from '@hooks/useMembers';
import { SuspenseLoader } from '@components/pages/SuspenseLoader/index';
import { ProfileData } from './ProfileData';
import { useAuth } from '@hooks/useAuth';

export const UserProfile: React.FC = () => {
  const { activeMember } = useMembers();
  const { user } = useAuth();

  const [step, setStep] = useState(1);
  const [routeForNextStep, setRouteForNextStep] = useState<string>('/');

  useEffect(() => {
    if (activeMember) {
      const { personal, supplementary, ecclesiastical } = activeMember;

      if (activeMember?.process) {
        if (activeMember?.process?.hasEcclesiastical) {
          setStep(4); // go to '/registration/resume'
          setRouteForNextStep('/registration/resume');
        } else if (activeMember?.process?.hasSupplementary) {
          setStep(3); // go to '/registration/ecclesiastical'
          setRouteForNextStep('/registration/ecclesiastical');
        } else if (activeMember?.process?.hasPersonal) {
          setStep(2); // go to '/registration/supplementary'
          setRouteForNextStep('/registration/supplementary');
        } else if (!activeMember?.process) {
          setStep(1); // go to '/registration/personal'
          setRouteForNextStep('/registration/personal');
        }
      } else {
        setStep(1); // go to '/registration/personal'
        setRouteForNextStep('/registration/personal');
      }

      /* if (ecclesiastical) {
        setStep(4); // go to '/registration/resume'
        setRouteForNextStep('/registration/resume');
      } else if (supplementary) {
        setStep(3); // go to '/registration/ecclesiastical'
        setRouteForNextStep('/registration/ecclesiastical');
      } else if (personal) {
        setStep(2); // go to '/registration/supplementary'
        setRouteForNextStep('/registration/supplementary');
      } else {
        setStep(1); // go to '/registration/personal'
        setRouteForNextStep('/registration/personal');
      } */
    }
  }, [activeMember]);

 
  return (
    <>
      {activeMember ? (
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
                <ProfileCover
                  user={activeMember}
                  step={step}
                  routeForNextStep={routeForNextStep}
                />
              </Grid>
              <Grid item xs={12} md={10}>
                <ProfileData user={activeMember} step={step} />
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
