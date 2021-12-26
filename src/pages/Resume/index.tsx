import { Helmet } from 'react-helmet-async';
import { PageHeader } from './PageHeader';
import PageTitleWrapper from '@components/pages/PageTitleWrapper';
import { Grid, Container } from '@mui/material';

import Footer from '@components/layout/Footer';
import { Membership } from './Membership';
import { useMembers } from '@hooks/useMembers';
import { SuspenseLoader } from '@components/pages/SuspenseLoader/index';

export const Resume = () => {
	const { isLoading } = useMembers();

	if (isLoading) {
		return <SuspenseLoader />;
	}

	return (
		<>
			<Helmet>
				<title>Gestão - Cadastrados</title>
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
						<Membership />
					</Grid>
				</Grid>
			</Container>
			<Footer />
		</>
	);
};
