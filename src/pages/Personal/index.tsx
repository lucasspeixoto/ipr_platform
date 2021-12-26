import Footer from '@components/layout/Footer';
import PageTitleWrapper from '@components/pages/PageTitleWrapper';
import { Container, Grid } from '@mui/material';

import { Helmet } from 'react-helmet-async';
import { FormFields } from './FormFields';
import { PageHeader } from './PageHeader';

export const Personal = () => {
	return (
		<>
			<Helmet>
				<title>Cadastro - Dados Pessoais</title>
			</Helmet>
			<PageTitleWrapper>
				<PageHeader />
			</PageTitleWrapper>
			<Container maxWidth='lg'>
				<Grid
					container
					direction='row'
					justifyContent='center'
					alignItems='stretch'
					spacing={3}
				>
					<Grid item xs={12}>
						<FormFields />
					</Grid>
				</Grid>
			</Container>
			<Footer />
		</>
	);
};
