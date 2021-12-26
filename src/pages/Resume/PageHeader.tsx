import React from 'react';
import { Typography, Grid } from '@mui/material';

import { useAuth } from '@hooks/useAuth';

export const PageHeader: React.FC = () => {
	const { user } = useAuth();

	return (
		<Grid container justifyContent='space-between' alignItems='center'>
			<Grid item>
				<Typography variant='h3' component='h3' gutterBottom>
					Cadastrados
				</Typography>
				<Typography variant='subtitle2'>
					{user?.name}, segue lista de irmãos cadastrados
				</Typography>
			</Grid>
		</Grid>
	);
};
