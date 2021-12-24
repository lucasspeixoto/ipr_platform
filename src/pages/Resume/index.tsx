import { Helmet } from 'react-helmet-async';
import PageHeader from './PageHeader';
import PageTitleWrapper from '@components/pages/PageTitleWrapper';
import { Grid, Container } from '@mui/material';

import RecentOrders from './RecentOrders';
import Footer from '@components/layout/Footer';

export const Resume = () => {
  return (
    <>
      <Helmet>
        <title>Gestão - Cadastrados</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader />
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
            <RecentOrders />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

