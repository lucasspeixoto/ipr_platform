import React from 'react';
import Footer from '@components/layout/Footer';
import PageTitleWrapper from '@components/pages/PageTitleWrapper';
import { Container, Grid } from '@mui/material';

import { Helmet } from 'react-helmet-async';
import { FormFields } from './FormFields';
import { FormsPageHeader } from '@components/elements/FormsPageHeader';
import { useParameters } from '@hooks/useParameters';
import { SuspenseLoader } from '@components/pages/SuspenseLoader';

export const Personal: React.FC = () => {
  const { parameters } = useParameters();

  return (
    <>
      {parameters ? (
        <React.Fragment>
          <Helmet>
            <title>Cadastro - Dados Pessoais</title>
          </Helmet>
          <PageTitleWrapper>
            <FormsPageHeader
              title="Dados"
              subtitle="Preencha com atenção os seus dados pessoais"
            />
          </PageTitleWrapper>
          <Container maxWidth="lg">
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="stretch"
              spacing={3}
            >
              <Grid item xs={12}>
                <FormFields parameters={parameters} />
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
